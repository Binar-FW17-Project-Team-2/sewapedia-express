const user = require('express').Router()
const { isAuthenticated } = require('../../middleware')
const {
  getUsers,
  getUserById,
  editUser,
  deleteUser,
} = require('../../controller/user')

user.get('/', getUsers)
user.get('/:id', getUserById)
user.use(isAuthenticated)
user.put('/edit/:id', editUser)
user.delete('/:id', deleteUser)
// implement delete kalo mau ada delete

module.exports = user
