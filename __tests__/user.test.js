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

beforeAll((done) => {
  queryInterface
    .bulkInsert('users', users, { returning: true })
    .then((users) => {
      access_token_admin = createToken(users[0])
      access_token_user = createToken(users[1])
      done()
    })
})
afterAll(() => {
  return queryInterface.bulkDelete('users')
})

// ====> GET USERS <====
describe('GET /user', () => {
  test('TEST CASE 1: GET USERS SUCCESS', (done) => {
    request(app)
      .get(`/api/v1/user?offset=0&limit=1&id=${users[1].id}`)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('count', 1)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get(`/api/v1/user?id=error`)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> GET USER BY ID <====

describe('GET /user/:id', () => {
  test('TEST CASE 1: GET USER SUCCESS', (done) => {
    request(app)
      .get(`/api/v1/user/${users[1].id}`)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('id', `${users[1].id}`)
        done()
      })
  })
  test('TEST CASE 2: USER NOT FOUND', (done) => {
    request(app)
      .get(`/api/v1/user/10`)
      .end((err, res) => {
        if (err) return done(err)
        const { status } = res
        expect(status).toBe(404)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get(`/api/v1/user/eror`)
      .end((err, res) => {
        if (err) return done(err)
        const { status } = res
        expect(status).toBe(500)
        done()
      })
  })
})

// ===> WHO AM I <===
describe('GET /user/me', () => {
  test('TEST CASE 1: SUCCESS', (done) => {
    request(app)
      .get(`/api/v1/user/me`)
      .set({ access_token: access_token_admin })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('name', users[0].name)
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .get(`/api/v1/user/me`)
      .set({ access_token: createToken({ id: 'error' }) })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
  test('TEST CASE 3: ACCESS TOKEN GAK ADA', (done) => {
    request(app)
      .get(`/api/v1/user/me`)
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized')
        done()
      })
  })
  test('TEST CASE 4: ACCESS TOKEN RUSAK', (done) => {
    request(app)
      .get(`/api/v1/user/me`)
      .set({ access_token: 'rusaak' })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized')
        done()
      })
  })
})

// ====> EDIT USER <====
describe('PUT /user', () => {
  test('TEST CASE 1: EDIT SUCCESS', (done) => {
    request(app)
      .put('/api/v1/user')
      .set({ access_token: access_token_user })
      .send({
        email: 'emailbaru@gmail.com',
        name: 'newName',
        image: 'imagebaru',
        role: 'user',
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', 'berhasil diedit')
        done()
      })
  })
  test('TEST CASE 2: INVALID INPUT', (done) => {
    request(app)
      .put('/api/v1/user')
      .set({ access_token: access_token_user })
      .send({ email: 9090909 })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        done()
      })
  })
})

// ====> DELETE USER <====
describe('DELETE /user/:userId', () => {
  test('TEST CASE 1: UNAUTHORIZED', (done) => {
    request(app)
      .delete(`/api/v1/user/${users[0].id}`)
      .set({ access_token: access_token_user })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'Unauthorized')
        done()
      })
  })
  test('TEST CASE 2: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .delete(`/api/v1/user/akanerror`)
      .set({ access_token: access_token_admin })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
  test('TEST CASE 3: SUCCESS', (done) => {
    request(app)
      .delete(`/api/v1/user/${users[1].id}`)
      .set({ access_token: access_token_user })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
})
