const user = require('express').Router()
const { isAuthenticated } = require('../../middleware')
const {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  whoAmI,
} = require('../../controller/user')

user.get('/', getUsers)
user.get('/:id', getUserById)
user.use(isAuthenticated)
user.get('/me', whoAmI)
user.put('/:id', editUser)
user.delete('/:id', deleteUser)

module.exports = user
