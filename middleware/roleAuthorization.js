const { User } = require('../models')

/**
 * untuk akses user dan admin => roleAuthorization()
 * untuk akses yang hanya bisa dilihat admin => roleAuthorization('admin')
 */

module.exports = (option) => {
  return (req, res, next) => {
    const { id, role } = req.user
    const uid = req.query.userId || req.params.id
    let authorize = false
    if (option === 'admin' && role === 'admin') authorize = true
    if (!option) {
      if (role === 'admin') authorize = true
      if (role === 'user' && id == uid) authorize = true
    }
    authorize ? next() : res.send('unauthorize')
  }
}
