const { Wishlist } = require('../../models')
const { validationHandler } = require('../../utils')

module.exports = async (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.body.productId
    console.log(req.body)
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
    console.log(err)
    const error = validationHandler(err)
    error
      ? res.status(400).json(error)
      : res.status(500).json({ message: 'Internal Server Error' })
  }
}
