const { Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteProductById = await Product.destroy({
      where: {
        id: id,
      },
    })
    if (!deleteProductById)
      res.status(500).json([0, { message: 'id not found' }])
    return res.status(200).json([1, { message: 'delete success' }])
  } catch (err) {
    next(err)
  }
}
