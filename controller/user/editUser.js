const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.user.id
    const updateUser = {
      email: req.body.email,
      name: req.body.name,
      image: req.body.image,
      role: req.body.role,
    }
    await User.update(updateUser, { where: { id }, individualHooks: true })
    res.status(200).json({ message: 'berhasil diedit' })
  } catch (error) {
    next(error)
  }
}
