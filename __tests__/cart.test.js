const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { createToken } = require('../utils/tokenHandler')
const { hash } = require('../utils/passwordHandler')

let access_token_admin
let access_token_user
const users = [
  {
    id: 1000,
    email: 'admin@sewapedia.com',
    password: hash('password00'),
    role: 'admin',
    name: 'Kim Ji Soo',
  },
  {
    id: 1001,
    email: 'user01@gmail.com',
    password: hash('password00'),
    name: 'Jang Won Young',
    role: 'user',
  },
]

const products = [
  {
    id: 1000,
    name: 'product1',
    category: 'category1',
    details: 'details1',
    img_url: ['image1', 'image2'],
    price: 2000,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1001,
    name: 'product2',
    category: 'category2',
    details: 'details2',
    img_url: ['image3', 'image4'],
    price: 5000,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const carts = [
  {
    id: 4040,
    lamaSewa: 10,
    qty: 1,
    priceItem: products[0].price,
    subTotalPrice: 10 * 1 * products[0].price,
    status: 'cart',
    productId: products[0].id,
    userId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4400,
    lamaSewa: 10,
    qty: 1,
    priceItem: products[1].price,
    subTotalPrice: 10 * 1 * products[1].price,
    status: 'cart',
    productId: products[1].id,
    userId: users[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

beforeAll((done) => {
  queryInterface
    .bulkInsert('users', users, { returning: true })
    .then((users) => {
      access_token_admin = createToken(users[0])
      access_token_user = createToken(users[1])
      return queryInterface.bulkInsert('products', products)
    })
    .then(() => queryInterface.bulkInsert('order_items', carts))
    .then(() => done())
    .catch((err) => done(err))
})

afterAll((done) => {
  queryInterface
    .bulkDelete('users')
    .then(() => queryInterface.bulkDelete('products'))
    .then(() => queryInterface.bulkDelete('order_items'))
    .then(() => done())
    .catch((err) => done(err))
})

// ====> GET CARTS <====
describe('GET /cart', () => {
  test('TEST CASE 1: SUCCES GET CART', (done) => {
    request(app)
      .get('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get('/api/v1/cart')
      .set({ authorization: `Bearer ${createToken({ id: 'eror' })}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

//  ====> ADD CART <====
describe('ADD /cart', () => {
  test('TEST CASE 1: SUCCESS ADD TO CART', (done) => {
    request(app)
      .post('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: PRODUCT ALREADY IN CART', (done) => {
    request(app)
      .post('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty(
          'message',
          'produk sudah ada dikeranjang'
        )
        done()
      })
  })
  test('TEST CASE 3: PRODUCT NOT FOUND', (done) => {
    request(app)
      .post('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 2022,
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'produk gak ada')
        done()
      })
  })
  test('TEST CASE 4: PRODUCTID MUST BE NUMBER', (done) => {
    request(app)
      .post('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 'bukan number',
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'produkId harus number')
        done()
      })
  })
  test('TEST CASE 5: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/cart')
      .set({ authorization: `Bearer ${createToken({ id: 'error' })}` })
      .send({
        productId: products[0].id,
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

//  ====> UPDATE CART <====
describe('PUT /cart', () => {
  test('TEST CASE 1: SUCCESS UPDATE CART', (done) => {
    request(app)
      .put('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        lamaSewa: 9,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: NO CHANGES', (done) => {
    request(app)
      .put('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        lamaSewa: 9,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'tidak ada perubahan')
        done()
      })
  })
  test('TEST CASE 3: PRODUCT NOT FOUND', (done) => {
    request(app)
      .put('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 2022,
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'produk gak ada')
        done()
      })
  })
  test('TEST CASE 4: PRODUCTID MUST BE NUMBER', (done) => {
    request(app)
      .put('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 'bukan number',
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message', 'produkId harus number')
        done()
      })
  })
  test('TEST CASE 5: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .put('/api/v1/cart')
      .set({ authorization: `Bearer ${createToken({ id: 'error' })}` })
      .send({
        productId: products[0].id,
        lamaSewa: 10,
        qty: 1,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> DELETE PRODUCT <====
describe('DELETE /cart', () => {
  test('TEST CASE 1: SUCCESS DELETE CART', (done) => {
    request(app)
      .delete('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({ id: products[0].id })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .delete('/api/v1/cart')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({ id: 'error' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})
