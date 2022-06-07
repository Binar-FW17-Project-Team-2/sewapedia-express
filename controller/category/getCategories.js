const { Category } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: ['name'],
    })
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}
