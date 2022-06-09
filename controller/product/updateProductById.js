const { Product } = require('../../models')

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
    next(err)
  }
}
