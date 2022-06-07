const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id
    const deleteUserById = await User.destroy({
      where: {
        id: id,
      },
    })
    if (!deleteUserById) res.status(500).json([0, { message: 'id not found' }])
    return res.status(200).json([1, { message: 'delete success' }])
  } catch (err) {
    res.status(500).json({ message: 'internal server error' })
  }
}
