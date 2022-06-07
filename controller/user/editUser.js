const { User } = require('../../models')

module.exports = async (req, res) => {
  try {
    const id = req.params.id
    const updateUser = {
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
      role: req.body.role,
    }
    await User.update(updateUser, { where: { id }, individualHooks: true })
    res.status(201).json({ message: 'berhasil diedit' })
  } catch (error) {
    res.status(500).json({ message: 'internal server error' })
  }
}
