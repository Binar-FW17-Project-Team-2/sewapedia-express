const { User } = require('../../models')

module.exports = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
