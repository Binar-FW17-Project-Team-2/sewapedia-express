const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { id } = req.body
    const cartItem = await db.OrderItem.destroy({
      where: {
        userId: req.user.id,
        status: 'cart',
        id: id,
      },
    })
    res.status(200).json(cartItem)
  } catch (error) {
    next(error)
  }
}
