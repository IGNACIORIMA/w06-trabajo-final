const request = require("supertest")
const app = require('../app')
const { use } = require("../routes")

const BASE_URL = '/api/v1/users'
let TOKEN 
let TOKEN2
let user2Id

beforeAll(async()=> {
    const user = {
        email: "juan@gmail.com",
        password: "juan1234"
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)
    
    TOKEN = res.body.token
    /* console.log(TOKEN) */
})

const user2 = {
    firstName: "Iuvil",
    lastName: "Pena",
    email: "iuvil@gmail.com",
    password: "iuvil1234",
    phone: "+534856359867"
}

//1. POST
test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName', async () => {

    const res = await request(app)
        .post(BASE_URL)
        .send(user2)
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBeDefined()
    expect(res.body.firstName).toBe(user2.firstName)
})

//.1 LOGIN OK 
test('POST -> BASE_URL/login, should return statusCode 200, and res.body.user.firstName === user2.firstName', async() => {
    const hits = {
        email: "iuvil@gmail.com",
        password: "iuvil1234"
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(hits)
    TOKEN2 = res.body.token
    user2Id = res.body.user.id
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.firstName).toBe(user2.firstName)
});

// .2 LOGIN validando error
test('POST -> BASE_URL/login, should return statusCode 401', async() => {
    const hits = {
        email: "iuvil@gmail.com",
        password: "iuvil1224"
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(hits)
    expect(res.statusCode).toBe(401)
});


//2. GET
test('GET -> BASE_URL, should return statuscode 200, and res.body.length === 2', async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN2}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
})

//3. UPDATE
test('UPDATE -> BASE_URL/:id, should return ', async () => {
    const user2Upd = {
        firstName: 'Luvil',
        email: 'luvil@gmail.com',
        password: 'luvil1234',
        phone: '+593666554454'
    };

    const res = await request(app)
        .put(`${BASE_URL}/${user2Id}`)
        .send(user2Upd)
        .set('authorization', `Bearer ${TOKEN2}`)
    console.log(res)
    expect(res.statusCode).toBe(200)
    expect(res.body.firstName).toBe(user2Upd.firstName)
})

//4. DELETE
test('UPDATE -> BASE_URL/:id, shoul return')