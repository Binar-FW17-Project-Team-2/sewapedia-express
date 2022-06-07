const { Category, Product } = require('../../models')

module.exports = async (req, res) => {
  try {
    const { name } = req.params
    const products = await Product.findAll({ where: { category: name } })
    if (products.length)
      return res
        .status(400)
        .json({ message: 'category masih digunakan diproduct' })
    const category = await Category.destroy({ where: { name } })
    res.status(200).json([1, { message: 'category berhasil dihapus' }])
  } catch (error) {
    res.status(500).json('Internal server ERROR')
  }
}
