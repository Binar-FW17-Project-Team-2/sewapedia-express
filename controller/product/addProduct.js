const { Product } = require('../../models')
const { validationHandler } = require('../../utils')

module.exports = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    const error = validationHandler(err)
    error
      ? res.status(400).json(error)
      : res.status(500).json({ message: 'Internal Server Error' })
  }
}
