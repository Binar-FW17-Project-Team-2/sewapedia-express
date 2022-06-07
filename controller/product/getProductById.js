const { Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    const productById = await Product.findByPk(id)
    res.status(200).json(productById)
  } catch (error) {
    next(error)
  }
}
