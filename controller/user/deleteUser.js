const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await User.destroy({
      where: {
        id: id,
      },
    })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
