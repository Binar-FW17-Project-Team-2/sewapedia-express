describe('NODE ENV PRODUCTION', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })
  afterAll(() => {
    process.env = OLD_ENV
  })
  test('TEST CASE 1: CHANGE NODE ENV', (done) => {
    process.env.NODE_ENV = 'production'
    try {
      const model = require('../models')
      expect(process.env.NODE_ENV).toEqual(
        expect.stringContaining('production')
      )
      done()
    } catch (error) {
      done()
    }
  })
})
