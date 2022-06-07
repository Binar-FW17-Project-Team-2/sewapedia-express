const cart = require('express').Router()
const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
} = require('../../controller/cart')
const { isAuthenticated } = require('../../middleware')

cart.use(isAuthenticated)
cart.post('/', addToCart)
cart.get('/', getCart)
cart.put('/', updateCart)
cart.delete('/', deleteCart)

module.exports = cart
