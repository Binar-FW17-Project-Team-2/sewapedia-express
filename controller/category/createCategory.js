const { Category } = require('../../models')
const { validationHandler } = require('../../utils')

module.exports = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json([1, category])
  } catch (error) {
    const err = validationHandler(error)
    err
      ? res.status(400).json(err)
      : res.status(500).json('Internal server ERROR')
  }
}
