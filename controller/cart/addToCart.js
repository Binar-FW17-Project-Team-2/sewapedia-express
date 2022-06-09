const { Product, OrderItem } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user
    const { productId, lamaSewa, qty } = req.body
    if (isNaN(productId))
      return res.status(400).json({ message: 'produkId harus number' })
    const product = await Product.findOne({ where: { id: productId } })
    if (!product) return res.status(400).json({ message: 'produk gak ada' })
    const check = await OrderItem.findOne({
      where: {
        userId: id,
        productId,
        status: 'cart',
      },
    })
    if (check)
      return res.status(200).json({ message: 'produk sudah ada dikeranjang' })
    const cartItem = await OrderItem.create({
      userId: id,
      productId,
      lamaSewa,
      status: 'cart',
      priceItem: product.price,
      qty,
    })
    res.status(200).json({ message: 'product telah ditambahkan ke keranjang' })
  } catch (err) {
    next(err)
  }
}
