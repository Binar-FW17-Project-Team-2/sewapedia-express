const request = require('supertest')
const app = require('../app')
const { sequelize, Sequelize } = require('../models')
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

const wishlists = [
  {
    id: 1100,
    productId: products[0].id,
    userId: users[1].id,
  },
  {
    id: 1200,
    productId: products[1].id,
    userId: users[1].id,
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
    .then(() => queryInterface.bulkInsert('wishlists', wishlists))
    .then(() => done())
    .catch((err) => done(err))
})

afterAll((done) => {
  queryInterface
    .bulkDelete('users')
    .then(() => queryInterface.bulkDelete('products'))
    .then(() => queryInterface.bulkDelete('wishlists'))
    .then(() => done())
    .catch((err) => done(err))
})

// ====> GET WISHLIST <====
describe('GET /wishlists', () => {
  test('TEST CASE 1: SUCCESS GET WISHLIST', (done) => {
    request(app)
      .get(`/api/v1/wishlist?userId=${users[1].id}`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get(`/api/v1/wishlist?userId=error`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> CREATE WISHLIST <====
describe('CREATE /wihslist', () => {
  test('TEST CASE 1: SUCCESS CREATE WISHLIST', (done) => {
    request(app)
      .post('/api/v1/wishlist')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({ productId: products[0].id })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: PRODUCT ALREADY IN WISHLIST', (done) => {
    request(app)
      .post('/api/v1/wishlist')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({ productId: products[0].id })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 3: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/wishlist')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({ productId: 'error' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> DELETE WISHLIST <====
describe('DELETE /wishlist', () => {
  test('TEST CASE 1: DELETE SUCCESS', (done) => {
    request(app)
      .delete(
        `/api/v1/wishlist?userId=${users[1].id}&productId=${products[0].id}`
      )
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .delete(`/api/v1/wishlist?userId=erro&productId=erro`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})
