const db = require('../../models')
const { validationHandler } = require('../../utils')

module.exports = async (req, res) => {
  try {
    const { id } = req.user
    const { productId, qty, lamaSewa } = req.body
    if (isNaN(productId))
      return res.status(400).json({
        message: 'produkId harus number',
      })
    const product = await db.Product.findOne({ where: { id: productId } })
    if (!product) return res.status(400).json({ message: 'produk gak ada' })
    const cartItem = await db.OrderItem.update(
      {
        qty,
        lamaSewa,
      },
      {
        where: {
          userId: id,
          status: 'cart',
          productId,
        },
        individualHooks: true,
      }
    )
    cartItem[0]
      ? res.status(200).json({ message: 'update berhasil' })
      : res.status(200).json({ message: 'tidak ada perubahan' })
  } catch (err) {
    const error = validationHandler(err)
    error
      ? res.status(400).json(error)
      : res.status(500).json({ message: err.message })
  }
}
