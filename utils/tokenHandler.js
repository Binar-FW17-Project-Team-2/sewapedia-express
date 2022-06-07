require('dotenv').config()
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
function createToken(payload, exp = maxAge) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: exp })
}
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return null
    return data
  })
}

module.exports = {
  maxAge,
  createToken,
  verifyToken,
}
