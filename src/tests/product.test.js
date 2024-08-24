require('../models')
const request = require("supertest");
const app = require('../app');
const Category = require("../models/Category");

const product = {
    title: 'Blue wrangler Jeans women',
    description: 'lorem 20',
    price: 12.20
}

const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'

let category
let productId

beforeAll( async() => {
    const hits = {
        email: "juan@gmail.com",
        password: "juan1234"
    }

    category = await Category.create({ name: 'Women clothing'})
    product.categoryId = category.id

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(hits)
    
    TOKEN = res.body.token
});

afterAll(( async() => {
    await category.destroy()
}))

// 1. POST
test('POST -> BASE_URL, should return statusCode 201, and res.body,title === product.title', async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBe(category.id)
});

// 2. GET all
test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1', async() => {
    const res = await request(app)
        .get(BASE_URL)
        /* console.log(res.body) */

    expect(res.statusCode).toBe(200)
    /* expect(res.body.leng) */
});


// 3. GET one
test('GET -> BASE_URL/:id, should return statusCode 200, and res.body.title === product.title', async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)
        /* console.log(res.body) */

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
});

// 4. PUT
test('PUT -> BASE_URL/:id, should return statusCode 200, and res.body.title === productUpd.title', async () => {
    const productUpd = {
        title: "Black jeans women"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${productId}`)
        .send(productUpd)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpd.title)
});

// 5. DELETE
test('DELETE -> BASE_URL/:id, should return statusCode 204', async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        
       /*  console.log(res) */
    expect(res.statusCode).toBe(204)
});
