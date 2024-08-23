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


beforeAll( async() => {
    const hits = {
        email: "juan@gmail.com",
        password: "juan1234"
    }
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
    category = await Category.create({ name: 'Women clothing'})
    product.categoryId = category.id
    console.log('este es product antes de enviarlo', product)
    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

/* //2. GET all
test('GET -> BASE_URL, should return statusCode 200, and', async() => {
    const res = await request(app)
        .get(BASE_URL)
    console.log(res)
    /* expect(res.statusCode).toBe(200)
})
 */