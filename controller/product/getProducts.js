const { Product, Sequelize } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { limit, offset, orderBy, order, ...query } = req.query
    if (query.name) {
      query.name = {
        [Sequelize.Op.iLike]: `%${query.name}%`,
      }
    }
    const products = await Product.findAndCountAll({
      where: { ...query },
      limit: limit ?? null,
      offset: offset ?? null,
      order: [[orderBy ?? 'createdAt', order ?? 'DESC']],
    })
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}
