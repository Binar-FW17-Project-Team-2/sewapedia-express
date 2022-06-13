const { Wishlist } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const userId = req.query.userId
    const productId = req.query.productId
    await Wishlist.destroy({
      where: {
        userId: userId,
        productId: productId,
      },
    })
    return res.status(200).json({ message: 'delete success' })
  } catch (error) {
    next(error)
  }
}
