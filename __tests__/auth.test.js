const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { createToken } = require('../utils/tokenHandler')
const { queryInterface } = sequelize

afterAll(() => {
  return queryInterface.bulkDelete('users')
})

const user = {
  name: 'Jisooya',
  email: 'jisooya@gmail.com',
  password: 'Jis00yaa',
  role: 'user',
}

describe('POST /signup', () => {
  test('TEST CASE 1: SIGNUP CREDENTIALS', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        user.id = body.id
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', user.name)
        expect(body).toHaveProperty('email', user.email)
        done()
      })
  })
  test('TEST CASE 2: SIGNUP OAUTH', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        name: user.name,
        email: user.email,
        provider: 'github',
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(201)
        expect(body).toHaveProperty('provider', 'github')
        expect(body).toHaveProperty('email', user.email)
        done()
      })
  })
  test('TEST CASE 3: VALIDATION UNIQUE', (done) => {
    request(app)
      .post('/api/v1/signup')
      .send({
        name: user.name,
        email: user.email,
        provider: 'github',
      })
      .end((err, res) => {
        if (err) return done(err)
        const { body, status } = res
        expect(status).toBe(400)
        expect(body).toHaveProperty('email', 'email already exist')
        done()
      })
  })
})

// ====> LOGIN <====
describe('POST /login', () => {
  test('TEST CASE 1: LOGIN SUCCESS', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('email', user.email)
        done()
      })
  })
  test('TEST CASE 2: INVALID EMAIL', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: 'invalid#gmail.com',
        password: user.password,
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('email', 'invalid email')
        done()
      })
  })
  test('TEST CASE 3: INVALID PASSWORD', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: user.email,
        password: 'invalidPassw00rd',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('password', 'invalid password')
        done()
      })
  })
  test('TEST CASE 4: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: 500,
        password: 'invalidPassw00rd',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> FORGOT PASSWORD <====
describe('POST /forgotpw', () => {
  test('TEST CASE 1: LINK SENT SUCCESSFULLY', (done) => {
    request(app)
      .post('/api/v1/forgotpw')
      .send({ email: user.email })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: EMAIL NOT REGISTERED', (done) => {
    request(app)
      .post('/api/v1/forgotpw')
      .send({ email: 'fake@gmail.com' })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toEqual(
          expect.arrayContaining([
            0,
            {
              message: 'e-mail not registered',
            },
          ])
        )
        done()
      })
  })
  test('TEST CASE 3: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/forgotpw')
      .send({ email: 500 })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})

// ====> RESET PASSWORD <====
describe('POST /resetpw', () => {
  test('TEST CASE 1: SUCCESS RESET PASSWORD', (done) => {
    request(app)
      .post('/api/v1/resetpw')
      .send({
        password: 'newPassw0rd',
        token: createToken(user),
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(200)
        done()
      })
  })
  test('TEST CASE 2: TOKEN MALFORMED', (done) => {
    request(app)
      .post('/api/v1/resetpw')
      .send({
        password: 'newPassw0rd',
        token: 'malformedtoken',
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(400)
        expect(res.body).toEqual(
          expect.arrayContaining([0, { message: 'token malformed' }])
        )
        done()
      })
  })
  test('TEST CASE 3: INTERNAL SERVER ERROR', (done) => {
    request(app)
      .post('/api/v1/resetpw')
      .send({
        password: 'newPassw0rd',
        token: createToken({ id: 'error' }),
      })
      .end((err, res) => {
        if (err) return done(err)
        expect(res.status).toBe(500)
        expect(res.body).toHaveProperty('message', 'Internal server ERROR')
        done()
      })
  })
})
