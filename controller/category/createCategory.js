const { Category } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json([1, category])
  } catch (error) {
    next(error)
  }
}
