const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.user.id
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
