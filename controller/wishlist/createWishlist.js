const { Wishlist } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id
    const productId = req.body.productId
    const existedWishlist = await Wishlist.findOne({
      where: { userId: userId, productId: productId },
    })
    if (existedWishlist)
      return res
        .status(200)
        .json({ message: 'item already existed in wishlist' })
    const createWishlist = await Wishlist.create({ userId, productId })
    res
      .status(200)
      .json({ message: 'success adding wishlist', data: createWishlist })
  } catch (err) {
    next(err)
  }
}
