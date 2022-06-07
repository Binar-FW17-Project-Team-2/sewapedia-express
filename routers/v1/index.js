const v1 = require('express').Router()
const product = require('./productRouter')
const auth = require('./authRouter')
const wishlist = require('./wishlistRouter')
const category = require('./categoryRoutes')
const user = require('./userRouter')
const cart = require('./cartRouter')
const order = require('./orderRouter')

v1.use('/', auth)
v1.use('/product', product)
v1.use('/wishlist', wishlist)
v1.use('/category', category)
v1.use('/user', user)
v1.use('/cart', cart)
v1.use('/order', order)

module.exports = v1