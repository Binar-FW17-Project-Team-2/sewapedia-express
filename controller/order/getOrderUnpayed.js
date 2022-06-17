const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const order = await db.Order.findAll({
      where: { userId: req.user.id, status: 'unpayed' },
      include: [
        {
          model: db.OrderItem,
          as: 'listOrderItem',
          include: {
            model: db.Product,
            as: 'productDetails',
          },
        },
      ],
    })
    if (!order.length) return res.status(200).json(order)
    let items = []
    for (let i = 0; i < order.length; i++) {
      const orders = order[i].toJSON()
      items = items.concat(orders.listOrderItem)
    }
    res.status(200).json(items)
  } catch (error) {
    next(error)
  }
}
