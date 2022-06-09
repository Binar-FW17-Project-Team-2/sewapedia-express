const wishlist = require('express').Router()
const {
  createWishlist,
  viewWilshlistById,
  deleteWishlistById,
} = require('../../controller/wishlist')
const { isAuthenticated, roleAuthorization } = require('../../middleware')

wishlist.use(isAuthenticated)
// wishlist.use(roleAuthorization())
wishlist.post('/', createWishlist)
wishlist.get('/', viewWilshlistById)
wishlist.delete('/', deleteWishlistById)

module.exports = wishlist
