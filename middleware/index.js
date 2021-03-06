const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const middleware = {}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    middleware[file.slice(0, -3)] = require(path.join(__dirname, file))
  })

module.exports = middleware
