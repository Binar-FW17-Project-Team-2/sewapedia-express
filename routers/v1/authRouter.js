const auth = require('express').Router()
const {
  login,
  forgotPassword,
  resetPassword,
  signUp,
} = require('../../controller/authentication')

auth.post('/login', login)
auth.post('/forgotpw', forgotPassword)
auth.post('/resetpw', resetPassword)
auth.post('/signup', signUp)

module.exports = auth
