const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id)
    if (user) {
      const { password, ...payload } = user.dataValues
      res.status(200).json(payload)
    } else {
      res.status(404).json(user)
    }
  } catch (error) {
    next(error)
  }
}
