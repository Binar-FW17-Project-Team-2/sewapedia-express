const { Product } = require('../../models')
const { validationHandler } = require('../../utils')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    const updateProductById = await Product.update(req.body, {
      where: {
        id: id,
      },
    })
    const newData = await Product.findAll({ where: { id: id } })
    res.status(201).json({ message: 'Update success', data: newData })
  } catch (err) {
    const error = validationHandler(err)
    error
      ? res.status(400).json(error)
      : res.status(500).json({ message: 'Internal Server Error' })
  }
}
