const { Category } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const name = req.params.name
    const categoryByName = await Category.findByPk(name)
    res.status(200).json(categoryByName)
  } catch (error) {
    next(error)
  }
}
