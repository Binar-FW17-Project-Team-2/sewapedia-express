const { User } = require('../../models')
const { verifyToken } = require('../../utils/tokenHandler')

module.exports = async (req, res, next) => {
  try {
    const { password, token } = req.body
    const payload = verifyToken(token)
    if (!payload)
      return res.status(400).json([0, { message: 'token malformed' }])
    await User.update(
      {
        password,
      },
      {
        where: { id: payload.id },
        individualHooks: true,
      }
    )
    res.status(200).json([1, { message: 'reset passwors successful' }])
  } catch (error) {
    next(error)
  }
}
