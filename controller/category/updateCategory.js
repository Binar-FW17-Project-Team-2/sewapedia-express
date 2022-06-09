const { Category } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const category = await Category.update(req.body, {
      where: { name: req.params.name },
    })
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}
