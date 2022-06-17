const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const rented = await db.OrderItem.findOne({
      where: { id: req.params.id },
      include: {
        model: db.Product,
        as: 'productDetails',
      },
    })
    if (!rented) return res.status(404).json({ message: 'rented not found' })
    res.status(200).json(rented)
  } catch (error) {
    next(error)
  }
}
