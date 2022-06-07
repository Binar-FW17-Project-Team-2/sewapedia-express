const { Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { count } = await Product.findAndCountAll({
      attributes: ['category'],
      group: ['category'],
    })
    res.status(200).json(count)
  } catch (error) {
    next(error)
  }
}
