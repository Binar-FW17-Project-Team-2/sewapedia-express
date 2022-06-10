const { verifyToken } = require('../utils/tokenHandler')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).json({ message: 'Unauthorized' })
  const access_token = authorization.split(' ')
  if (access_token[0] !== 'Bearer')
    return res.status(401).json({ message: 'Unauthorized' })
  const data = verifyToken(access_token[1])
  if (!data) return res.status(401).json({ message: 'Unauthorized' })
  req.user = data
  next()
}
