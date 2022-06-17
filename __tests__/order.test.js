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
    stock: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const orderItem = [
  {
    id: 201,
    lamaSewa: 2,
    qty: 1,
    priceItem: products[0].price,
    subTotalPrice: 2 * 2 * products[0].price,
    productId: products[0].id,
    userId: users[1].id,
    status: 'order',
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: 301,
  },
  {
    id: 202,
    lamaSewa: 2,
    qty: 1,
    priceItem: products[0].price,
    subTotalPrice: 2 * 2 * products[0].price,
    productId: products[0].id,
    userId: users[1].id,
    status: 'order',
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: 301,
  },
  {
    id: 203,
    lamaSewa: 2,
    qty: 3,
    priceItem: products[0].price,
    subTotalPrice: 2 * 2 * products[0].price,
    productId: products[0].id,
    userId: users[0].id,
    status: 'order',
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: 302,
  },
]
const orders = [
  {
    id: 301,
    status: 'unpayed',
    totalPrice: orderItem[0].subTotalPrice,
    userId: users[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 302,
    status: 'unpayed',
    totalPrice: orderItem[0].subTotalPrice,
    userId: users[0].id,
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
      return queryInterface.bulkInsert('orders', orders, { returning: true })
    })
    .then(() => {
      return queryInterface.bulkInsert('order_items', orderItem, {
        returning: true,
      })
    })
    .then((data) => {
      done()
    })
    .catch((err) => done(err))
})

afterAll((done) => {
  queryInterface
    .bulkDelete('users')
    .then(() => queryInterface.bulkDelete('products'))
    .then(() => queryInterface.bulkDelete('order_items'))
    .then(() => queryInterface.bulkDelete('orders'))
    .then(() => done())
    .catch((err) => done(err))
})

// ====> GET ORDER UNPAYED <====
describe('GET /order/unpayed', () => {
  test('TEST CASE 1: SUCCESS', (done) => {
    request(app)
      .get(`/api/v1/order/unpayed`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: GAK ADA', (done) => {
    request(app)
      .get(`/api/v1/order/unpayed`)
      .set({ authorization: `Bearer ${createToken({ id: 111 })}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 3: ERROR', (done) => {
    request(app)
      .get(`/api/v1/order/unpayed`)
      .set({ authorization: `Bearer ${createToken({ id: 'error' })}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> CONFIRM ORDER <====
describe('POST /order/:id', () => {
  test('TEST CASE 1: KONFIRMASI ORDER SUCCESS', (done) => {
    request(app)
      .post(`/api/v1/order/${orders[0].id}`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: RECEIPT GAK ADA', (done) => {
    request(app)
      .post(`/api/v1/order/${orders[0].id}`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(404)
        done()
      })
  })
  test('TEST CASE 3: STOCK KURANG', (done) => {
    request(app)
      .post(`/api/v1/order/${orders[1].id}`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done()
      })
  })
  test('TEST CASE 4: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post(`/api/v1/order/error`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> GET RENTED PRODUCT <====
describe('GET /ORDER/RENTED', () => {
  test('TEST CASE 1: SUCCESS', (done) => {
    request(app)
      .get('/api/v1/order/rented')
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: ERROR', (done) => {
    request(app)
      .get('/api/v1/order/rented')
      .set({ authorization: `Bearer ${createToken({ id: 'error' })}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> GET RENTED PRODUCT BY ID <====
describe('GET /ORDER/RENTED/:ID', () => {
  test('TEST CASE 1: SUCCESS', (done) => {
    request(app)
      .get(`/api/v1/order/rented/${orderItem[0].id}`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: NOT FOUND', (done) => {
    request(app)
      .get(`/api/v1/order/rented/110`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(404)
        done()
      })
  })
  test('TEST CASE 3: INTERNAL', (done) => {
    request(app)
      .get(`/api/v1/order/rented/erro`)
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> CONFIRM RETURN <===
describe('POST /order/rented/:id', () => {
  test('TEST CASE 1: SUCCESS', (done) => {
    request(app)
      .post(`/api/v1/order/rented/${orderItem[0].id}`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: NOT FOUND', (done) => {
    request(app)
      .post(`/api/v1/order/rented/111`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(404)
        done()
      })
  })
  test('TEST CASE 3: ERROR', (done) => {
    request(app)
      .post(`/api/v1/order/rented/erro`)
      .set({ authorization: `Bearer ${access_token_admin}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

// ====> GET RETURNED <====
describe('GET /order/return', () => {
  test('TEST CASE 1: SUCCESS', (done) => {
    request(app)
      .get('/api/v1/order/return')
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: ERROR', (done) => {
    request(app)
      .get('/api/v1/order/return')
      .set({ authorization: `Bearer ${createToken({ id: 'error' })}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})

describe('POST /order/item', () => {
  afterAll(() => {
    return queryInterface.bulkDelete('order_items')
  })
  test('TEST CASE 1: CREATE ORDER ITEM SUCCESS', (done) => {
    request(app)
      .post('/api/v1/order/item')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        qty: 2,
        lamaSewa: 2,
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(201)
        done()
      })
  })
  test('TEST CASE 2: INPUT FAILED', (done) => {
    request(app)
      .post('/api/v1/order/item')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: products[0].id,
        qty: 'dua',
        lamaSewa: 2,
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('qty', 'quantity must be number')
        done()
      })
  })
  test('TEST CASE 3: PRODUCT NOT FOUND', (done) => {
    request(app)
      .post('/api/v1/order/item')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 88888,
        qty: 2,
        lamaSewa: 2,
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'product tidak ada')
        done()
      })
  })
  test('TEST CASE 4: INTERNAL SERVER ERROR ', (done) => {
    request(app)
      .post('/api/v1/order/item')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({
        productId: 'djfk',
        qty: 2,
        lamaSewa: 2,
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> create receipt <====

describe('POST /order (receipt)', () => {
  const orderItems = [
    {
      id: 3000,
      lamaSewa: 2,
      qty: 2,
      priceItem: products[0].price,
      subTotalPrice: 2 * 2 * products[0].price,
      productId: products[0].id,
      userId: users[1].id,
      status: 'order',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  beforeAll((done) => {
    queryInterface
      .bulkInsert('order_items', orderItems, { returning: true })
      .then((data) => {
        orderItems[0].createdAt = data[0].createdAt.toISOString()
        orderItems[0].updatedAt = data[0].updatedAt.toISOString()
        done()
      })
      .catch((err) => done(err))
  })
  test('TEST CASE 1: CREATE RECEIPT SUCCESS', (done) => {
    request(app)
      .post('/api/v1/order')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({ items: [orderItems[0].id] })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: FAILED CREATE RECEIPT TWO TIMES', (done) => {
    request(app)
      .post('/api/v1/order')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({ items: [orderItems[0].id] })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty(
          'message',
          `order item dgn id ${orderItems[0].id} sudah di order`
        )
        done()
      })
  })
  test('TEST CASE 3: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/order')
      .set({ authorization: `Bearer ${access_token_user}` })
      .send({ items: 'akjflkdjfl' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> GET RECEIPT <====

describe('GET /order (receipt)', () => {
  test('TEST CASE 1: GET RECEIPT', (done) => {
    request(app)
      .get('/api/v1/order/1')
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get('/api/v1/order/JFKS')
      .set({ authorization: `Bearer ${access_token_user}` })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        done()
      })
  })
})
