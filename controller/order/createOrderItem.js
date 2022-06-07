const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { productId, qty, lamaSewa } = req.body
    if (isNaN(productId))
      return res.status(400).json({ message: 'produk id harus number' })
    const product = await db.Product.findOne({ where: { id: productId } })
    if (!product) return res.status(400).json({ message: 'product tidak ada' })
    const orderItem = await db.OrderItem.create({
      productId,
      userId: req.user.id,
      lamaSewa,
      qty,
      priceItem: product.price,
      status: 'order',
    })
    const response = { ...orderItem.dataValues, productDetails: product }
    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}
