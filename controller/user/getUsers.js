const { User } = require('../../models')
module.exports = async (req, res) => {
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
    res.status(500).json({ message: 'internal server error' })
  }
}
