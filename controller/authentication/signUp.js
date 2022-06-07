const { User } = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { role, ...body } = req.body
    if (body.provider && body.provider !== 'credentials') {
      body.password = `${body.email}${Math.random()}`
    }
    const user = await User.create(body)
    return res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}
