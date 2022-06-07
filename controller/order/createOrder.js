const db = require('../../models')
const { transporter, sendReceipt } = require('../../utils/sendEmail')

/**
 *
 * @items  array of id OrderItem
 */
module.exports = async (req, res, next) => {
  try {
    const { id, email } = req.user
    const { items } = req.body
    if (!Array.isArray(items))
      return res.status(400).json({ message: 'items harus array' })
    const itemsObj = await db.OrderItem.findAll({
      where: { id: items },
    })
    let totalPrice = 0
    let gagal = false
    for (let i = 0; i < itemsObj.length; i++) {
      totalPrice += itemsObj[i].dataValues.subTotalPrice
      if (itemsObj[i].dataValues.orderId) {
        gagal = itemsObj[i].dataValues.id
      }
    }
    if (gagal)
      return res
        .status(400)
        .json({ message: `order item dgn id ${gagal} sudah di order` })
    const order = await db.Order.create({
      userId: id,
      status: 'unpayed',
      totalPrice,
    })
    const update = await db.OrderItem.update(
      {
        status: 'order',
        orderId: order.id,
      },
      {
        where: { id: items },
      }
    )
    const sendEmail = await transporter.sendMail(sendReceipt(email, order))
    res.status(200).json({ email: sendEmail, info: [update[0], items.length] })
  } catch (err) {
    next(err)
  }
}
