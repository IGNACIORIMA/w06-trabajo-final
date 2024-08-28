require('../models')
const request = require("supertest");
const app = require('../app');
const Product = require('../models/Product');

const BASE_URL = '/api/v1/cart'
const BASE_URL_LOGIN = '/api/v1/users/login'

let TOKEN
let userId
let product

beforeAll( async() => {

    const hits = {
        email: "juan@gmail.com",
        password: "juan1234"
    }

    product = await Product.create({
        title: "Amzfit watch",
        description: "reloj inteligente marca Amazfit",
        price: 50,
        categoryI: 1
    })

    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(hits)

    TOKEN = res.body.token
    userId = res.body.user.id
})

const cart = {
    quantity: 2,
    userId,
    productId: 1
}

// 1. POST
test('POST -> BASE_URL, should return res.statusCode(201), and res.body.productId === product.id', async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set('Authorization', `Bearer ${TOKEN}`)
    /* console.log(res) */
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.productId).toBe(product.id)
});

// 2. GET all
test('GET -> BASE_URL, should return statusCode (200), and res.body.length === 1', async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
})