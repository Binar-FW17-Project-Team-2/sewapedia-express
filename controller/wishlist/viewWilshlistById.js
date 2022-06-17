const { User, Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const userId = req.query.userId
    const viewWishlist = await User.findAll({
      include: {
        model: Product,
        as: 'product_wishlist',
      },
      where: {
        id: userId,
      },
    })
    const wishlistData = viewWishlist[0].product_wishlist
    return res.status(200).send(wishlistData)
  } catch (error) {
    next(error)
  }
}
