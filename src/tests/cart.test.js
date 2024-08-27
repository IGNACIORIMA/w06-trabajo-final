require('../models')
const request = require("supertest");
const app = require('../app');
const Product = require('../models/Product');


const BASE_URL = '/api/v1/cart'
const BASE_URL_LOGIN = '/api/v1/users/login'
let TOKEN
let userId

beforeAll( async() => {

    const hits = {
        email: "juan@gmail.com",
        password: "juan1234"
    }

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
test('POST -> BASE_URL, should return res.statusCode(201),', async () => {
    const producto = await Product.create({
        title: "Amzfit watch",
        description: "reloj inteligente marca Amazfit",
        price: 50,
        categoryI: 1
    })

    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set('authorization', `Bearer ${TOKEN}`)
    console.log(res)
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.productId).toBe(producto.id)
});

// 2. GET