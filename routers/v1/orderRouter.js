const order = require('express').Router()
const {
  createOrderItem,
  createOrder,
  getOrder,
} = require('../../controller/order')
const { isAuthenticated } = require('../../middleware')

order.use(isAuthenticated)
order.get('/:id', getOrder)
order.post('/item', createOrderItem)
order.post('/', createOrder)

module.exports = order
