const request = require('supertest')
const app = require('../app')
const { sequelize, Sequelize } = require('../models')
const { queryInterface } = sequelize
const { createToken } = require('../utils/tokenHandler')
const { hash } = require('../utils/passwordHandler')
const tableProduct = require('../migrations/20220408163150-create-product')
const tableWishlist = require('../migrations/20220408163223-create-wishlist')
const tableOrderItem = require('../migrations/20220514112855-create-order-item')

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
      products[1].createdAt = data[1].createdAt.toISOString()
      products[1].updatedAt = data[1].updatedAt.toISOString()
      done()
    })
    .catch((err) => done(err))
})

afterAll((done) => {
  queryInterface
    .bulkDelete('users')
    .then(() => queryInterface.bulkDelete('products'))
    .then(() => done())
    .catch((err) => done(err))
})

// ====> GET PRODUCT <====
describe('GET /produtc/:id', () => {
  test('TEST CASE 1: SUCCESS GET PRODUCT', (done) => {
    request(app)
      .get(`/api/v1/product/${products[0].id}`)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id', products[0].id)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get(`/api/v1/product/error`)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> GET PRODUTCS <====
describe('GET /product', () => {
  test('TEST CASE 1: SUCCES GET PRODUCTS', (done) => {
    request(app)
      .get(
        `/api/v1/product?limit=1&offset=0&orderBy=name&order=DESC&name=product`
      )
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('count', 2)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get(`/api/v1/product?id=eror`)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})
// ====> ADD PRODUCT <====
describe('ADD /product', () => {
  test('TEST CASE 1: ADD PRODUCT SUCCESS', (done) => {
    request(app)
      .post('/api/v1/product')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({
        id: 333,
        name: 'testproduct',
        details: 'detailproduct',
        img_url: ['image1', 'image2'],
        category: 'test',
        stock: 5,
        price: 200,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id', 333)
        done()
      })
  })
  test("TEST CASE 2: INPUT CAN'T NULL", (done) => {
    request(app)
      .post('/api/v1/product')
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('name', "can't be null")
        expect(body).toHaveProperty('details', "can't be null")
        expect(body).toHaveProperty('price', 'cannot be null')
        expect(body).toHaveProperty('stock', 'cannot be null')
        done()
      })
  })
  test("TEST CASE 3: USER CAN'T ADD PRODUCT", (done) => {
    request(app)
      .post('/api/v1/product')
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized')
        done()
      })
  })
})

// ====> UPDATE PRODUCT <====
describe('UPDATE /product', () => {
  test('TEST CASE 1: UPDATE SUCCESS', (done) => {
    request(app)
      .put(`/api/v1/product/${products[0].id}`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .send({
        name: 'testproduct',
        details: 'detailproduct',
        img_url: ['image1', 'image2'],
        category: 'test',
        stock: 5,
        price: 200,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('message', 'Update success')
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .put(`/api/v1/product/error`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})
// ====> DELETE PRODUCT <====
describe('DELETE /product', () => {
  test('TEST CASE 1: DELETE SUCCESS', (done) => {
    request(app)
      .delete(`/api/v1/product/${products[0].id}`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message', 'delete success')
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .delete(`/api/v1/product/error`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> GET LIST CATEGORY <====
describe('GET /product/category', () => {
  test('TEST CASE 1: SUCCESS GET LIST CATEGORY', (done) => {
    request(app)
      .get('/api/v1/product/category')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
})
describe('GET /product/category', () => {
  beforeEach((done) => {
    tableOrderItem.down(queryInterface).catch(() => {
      tableWishlist.down(queryInterface).then(() => {
        tableProduct.down(queryInterface)
        done()
      })
    })
  })
  afterEach(async () => {
    return tableProduct
      .up(queryInterface, Sequelize)
      .then(() => tableWishlist.up(queryInterface, Sequelize))
      .then(() => tableOrderItem.up(queryInterface, Sequelize))
      .catch((err) => console.log(err))
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get('/api/v1/product/category')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})
