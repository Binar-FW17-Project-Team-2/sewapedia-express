const { User } = require('../../models')
const { validationHandler } = require('../../utils/')

module.exports = async (req, res) => {
  try {
    console.log('buat user')
    const { role, ...body } = req.body
    console.log(body.provider)
    if (body.provider && body.provider !== 'credentials') {
      body.password = `${body.email}${Math.random()}`
    }
    const user = await User.create(body)
    return res.status(201).json(user)
  } catch (err) {
    const error = validationHandler(err)
    error
      ? res.status(400).json(error)
      : res.status(500).json({ message: error.message })
  }
}
