const db = require('../../models')

module.exports = async (req, res) => {
  try {
    const { id } = req.user
    const cart = await db.OrderItem.findAll({
      include: {
        model: db.Product,
        as: 'productDetails',
        attributes: {
          exclude: ['details', 'category', 'createdAt', 'updatedAt'],
        },
      },
      where: {
        userId: id,
        status: 'cart',
      },
      order: [['createdAt', 'ASC']],
    })
    res.status(200).json(cart)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}
