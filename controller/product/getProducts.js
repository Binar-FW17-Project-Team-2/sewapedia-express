const { Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { limit, offset, orderBy, order, ...query } = req.query
    const products = await Product.findAndCountAll({
      where: { ...query },
      limit: limit ?? null,
      offset: offset ?? null,
      order: [[orderBy ?? 'createdAt', order ?? 'ASC']],
    })
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}
