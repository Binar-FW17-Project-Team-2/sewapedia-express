const db = require('../../models')

module.exports = async (req, res) => {
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
    res.status(500).json({ message: error.message })
  }
}
