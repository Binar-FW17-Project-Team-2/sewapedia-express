const { Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    await Product.destroy({
      where: {
        id: id,
      },
    })
    return res.status(200).json({ message: 'delete success' })
  } catch (err) {
    next(err)
  }
}
