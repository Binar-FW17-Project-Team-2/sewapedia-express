const db = require('../../models')

module.exports = async (req, res, next) => {
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
    next(err)
  }
}
