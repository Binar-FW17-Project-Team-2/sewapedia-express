const { verifyToken } = require('../utils/tokenHandler')

module.exports = (req, res, next) => {
  const { access_token } = req.headers
  if (!access_token) return res.status(401).json({ message: 'Unauthorized' })
  const data = verifyToken(access_token)
  if (!data) return res.status(401).json({ message: 'Unauthorized' })
  req.user = data
  next()
}
