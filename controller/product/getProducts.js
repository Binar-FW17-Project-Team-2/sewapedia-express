const { Product } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { limit, offset, orderBy, order, ...query } = req.query
    console.log(query)
    const products = await Product.findAndCountAll({
      where: { ...query },
      limit: limit ?? null,
      offset: offset ?? null,
      order: [[orderBy ?? 'createdAt', order ?? 'ASC']],
    })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Internal server ERROR' })
  }
}
