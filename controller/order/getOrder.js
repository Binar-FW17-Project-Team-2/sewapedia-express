const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const order = await db.Order.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.OrderItem,
          as: 'listOrderItem',
        },
        {
          model: db.User,
          as: 'renter',
          include: {
            model: db.Biodata,
            as: 'Biodata',
          },
        },
      ],
    })
    console.log(order)
    res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}
