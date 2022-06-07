const { User } = require('../../models')
const { createToken } = require('../../utils/tokenHandler')
const { transporter, forgotPw } = require('../../utils/sendEmail')

module.exports = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({
      where: { email },
    })
    if (!user)
      return res.status(400).json([0, { message: 'e-mail not registered' }])
    const expired = 5 * 60
    const token = createToken({ id: user.id }, expired)
    await transporter.sendMail(forgotPw(user.email, token, expired))
    res.status(200).json([1, { message: 'e-mail has been sent' }])
  } catch (error) {
    res.status(500).json({ message: 'Internal Server ERROR' })
  }
}
