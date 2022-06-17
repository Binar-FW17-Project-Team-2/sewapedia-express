const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const returns = await db.OrderItem.findAll({
      where: { userId: req.user.id, status: ['returned', 'reviewed'] },
      include: {
        model: db.Product,
        as: 'productDetails',
      },
    })
    res.status(200).json(returns)
  } catch (error) {
    next(error)
  }
}
