const order = require('express').Router()
const {
  createOrderItem,
  createOrder,
  getOrder,
  confirmOrder,
  getOrderUnpayed,
  getRentedProduct,
  confirmReturn,
  getRentedById,
  getReturns,
} = require('../../controller/order')
const { isAuthenticated } = require('../../middleware')

order.use(isAuthenticated)
order.get('/unpayed', getOrderUnpayed)
order.get('/rented', getRentedProduct)
order.get('/rented/:id', getRentedById)
order.get('/return', getReturns)
order.get('/:id', getOrder)
order.post('/item', createOrderItem)
order.post('/rented/:id', confirmReturn)
order.post('/:id', confirmOrder)
order.post('/', createOrder)

module.exports = order
