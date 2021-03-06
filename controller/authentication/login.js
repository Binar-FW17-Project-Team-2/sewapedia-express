const { User } = require('../../models')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        provider: 'credentials',
      },
    })
    if (!user) throw { email: 'invalid email' }
    const { password, ...payload } = user.dataValues
    const auth = await bcrypt.compare(req.body.password, password)
    if (!auth) throw { password: 'invalid password' }
    res.status(200).json(payload)
  } catch (error) {
    if (error.email || error.password) res.status(400).json(error)
    else next(error)
  }
}
