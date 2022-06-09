const user = require('express').Router()
const { isAuthenticated, roleAuthorization } = require('../../middleware')
const {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  whoAmI,
} = require('../../controller/user')

user.get('/', getUsers)
user.get('/me', isAuthenticated, whoAmI)
user.get('/:id', getUserById)
user.use(isAuthenticated)
user.put('/', editUser)
user.delete('/:userId', roleAuthorization(), deleteUser)

module.exports = user
