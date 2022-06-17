const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const rented = await db.OrderItem.findOne({
      where: { id: req.params.id, status: 'rented' },
      include: {
        model: db.Product,
        as: 'productDetails',
      },
    })
    if (!rented) return res.status(404).json('rented product not found')
    rented.status = 'returned'
    rented.productDetails.stock += rented.qty
    await rented.productDetails.save()
    await rented.save()
    res.status(200).json(rented)
  } catch (error) {
    next(error)
  }
}
