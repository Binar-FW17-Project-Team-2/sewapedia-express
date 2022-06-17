const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const rented = await db.OrderItem.findAll({
      where: { userId: req.user.id, status: 'rented' },
      include: {
        model: db.Product,
        as: 'productDetails',
      },
    })
    res.status(200).json(rented)
  } catch (error) {
    next(error)
  }
}
