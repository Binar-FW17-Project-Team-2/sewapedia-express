const { User } = require('../../models')
module.exports = async (req, res, next) => {
  try {
    const { limit, offset, ...query } = req.query
    const user = await User.findAndCountAll({
      where: { ...query },
      attributes: { exclude: ['password'] },
      limit: limit ?? null,
      offset: offset ?? null,
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
