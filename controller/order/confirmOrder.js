const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const order = await db.Order.findOne({
      where: { id: req.params.id, status: 'unpayed' },
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
    if (!order) return res.status(404).json({ message: 'receipt not found' })
    order.status = 'payed'
    for (let i = 0; i < order.listOrderItem.length; i++) {
      if (
        order.listOrderItem[i].qty > order.listOrderItem[i].productDetails.stock
      ) {
        return res.status(400).json({ message: 'stock barang ada yg kurang' })
      }
      order.listOrderItem[i].productDetails.stock -= order.listOrderItem[i].qty
      order.listOrderItem[i].status = 'rented'
    }
    for (let i = 0; i < order.listOrderItem.length; i++) {
      await order.listOrderItem[i].save()
      await order.listOrderItem[i].productDetails.save()
    }
    await order.save()
    res.status(200).json({ message: 'confirm pembayaran berhasil' })
  } catch (error) {
    next(error)
  }
}
