const request = require('supertest')
const app = require('../app')
const db = require('../models')
const { queryInterface } = db.sequelize
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
]

beforeAll((done) => {
  queryInterface
    .bulkInsert('users', users, { returning: true })
    .then((users) => {
      access_token_admin = createToken(users[0])
      access_token_user = createToken(users[1])
      return queryInterface.bulkInsert('products', products, {
        returning: true,
      })
    })
    .then((data) => {
      products[0].createdAt = data[0].createdAt.toISOString()
      products[0].updatedAt = data[0].updatedAt.toISOString()
      done()
    })
    .catch((err) => done(err))
})

afterAll((done) => {
  queryInterface
    .bulkDelete('users')
    .then(() => queryInterface.bulkDelete('products'))
    .then(() => queryInterface.bulkDelete('order_items'))
    .then(() => queryInterface.bulkDelete('reviews'))
    .then(() => done())
    .catch((err) => done(err))
})

// ====> CREATE REVIEW <=====
describe('POST /review', () => {
  test('TEST CASE 1: CREATE SUCCESS', (done) => {
    request(app)
      .post('/api/v1/review')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        star: 4,
        message: 'hallow',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/review')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 'error',
        star: 4,
        message: 'hallow',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})
