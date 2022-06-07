const bcrypt = require('bcrypt')

function hash(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports = { hash }
