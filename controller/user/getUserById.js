const { User } = require('../../models')

module.exports = async (req, res) => {
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
    res.status(500).json({ message: 'internal server error' })
  }
}
