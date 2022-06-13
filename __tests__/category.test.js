const request = require('supertest')
const app = require('../app')
const { sequelize, Sequelize } = require('../models')
const { queryInterface } = sequelize
const { createToken } = require('../utils/tokenHandler')
const { hash } = require('../utils/passwordHandler')
const { up, down } = require('../migrations/20220408163145-create-category')
const { beforeEach, afterAll } = require('@jest/globals')

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
const categories = [
  {
    name: 'mobil',
    details: 'mainan mobil',
  },
  {
    name: 'boneka',
    details: 'mainan boneka',
  },
]
const products = [
  {
    id: 1000,
    name: 'product1',
    category: 'mobil',
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
      return queryInterface.bulkInsert('categories', categories)
    })
    .then(() => queryInterface.bulkInsert('products', products))
    .then(() => done())
    .catch((err) => done(err))
})
afterAll((done) => {
  queryInterface
    .bulkDelete('users')
    .then(() => queryInterface.bulkDelete('categories'))
    .then(() => queryInterface.bulkDelete('products'))
    .then(() => done())
    .catch((err) => done(err))
})

// ====> GET CATEGORIES <====
describe('GET /category', () => {
  test('TEST CASE 1: SUCCESS GET CATEGORY', (done) => {
    request(app)
      .get('/api/v1/category')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
})
describe('GET /category', () => {
  beforeEach((done) => {
    down(queryInterface)
      .then(() => done())
      .catch((err) => (err = null))
  })
  afterEach(() => {
    return up(queryInterface, Sequelize)
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get('/api/v1/category')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> GET CATEGORY BY NAME <====
describe('GET /category/:name', () => {
  test('TEST CASE 1: SUCCESS GET CATEGORY BY NAME', (done) => {
    request(app)
      .get('/api/v1/category/mobil')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
})
describe('GET /category/:name', () => {
  beforeEach((done) => {
    down(queryInterface)
      .then(() => done())
      .catch((err) => (err = null))
  })
  afterEach(() => {
    return up(queryInterface, Sequelize)
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get('/api/v1/category/mobil')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> CREATE CATEGORY <====
describe('POST /category', () => {
  test('TEST CASE 1: AUTH WITHOUT BEARER', (done) => {
    request(app)
      .post('/api/v1/category')
      .set({ authorization: 'Barer rusak' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('message', 'Unauthorized')
        done()
      })
  })
  test('TEST CASE 2: SUCCESS CREATE CATEGORY', (done) => {
    request(app)
      .post('/api/v1/category')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({
        name: 'category1',
        details: 'details1',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(201)
        done()
      })
  })
  test('TEST CASE 3: FAILED UNIQUE NAME', (done) => {
    request(app)
      .post('/api/v1/category')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({
        name: 'category1',
        details: 'details1',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done()
      })
  })
})

// ====> UPDATE CATEGORY <====
describe('PUT /category', () => {
  test('TEST CASE 1: SUCCESS UPDATE CATEGORY', (done) => {
    request(app)
      .put('/api/v1/category/mobil')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({ details: 'newdetails' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
})
describe('PUT /category/:name', () => {
  beforeEach((done) => {
    down(queryInterface)
      .then(() => done())
      .catch((err) => (err = null))
  })
  afterEach(() => {
    return up(queryInterface, Sequelize)
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .put('/api/v1/category/boneka')
      .send({ details: 'newDetails' })
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> DELETE CATEGORY <====
describe('DELETE /category/:name', () => {
  test('TEST CASE 1: SUCCESS DELETE CATEGORY', (done) => {
    request(app)
      .delete('/api/v1/category/boneka')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: FAILED CATEGORY IN USE', (done) => {
    request(app)
      .delete('/api/v1/category/mobil')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done()
      })
  })
})
describe('DELETE /category/:name', () => {
  beforeEach((done) => {
    down(queryInterface)
      .then(() => done())
      .catch((err) => (err = null))
  })
  afterEach(() => {
    return up(queryInterface, Sequelize)
  })
  test('TEST CASE 3: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .delete('/api/v1/category/boneka')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})
