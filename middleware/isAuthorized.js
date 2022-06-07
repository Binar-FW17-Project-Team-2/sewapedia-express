/**
 *
 * @options
 * [{role: 'admin'}, {eole:'user', sameUser: true}]
 * admin biasa akses punya sipa saja, user hanya bisa akses punya sendiri
 * [{sameUser: true}]
 * hanya bisa akses punya sendiri siapapun itu
 */

module.exports = (options) => {
  return (req, res, next) => {
    console.log(req.user)
    const { role, id } = req.user
    const uid = req.query.userId || req.params.id
    let isAuthorized = false
    for (const opt of options) {
      if (!opt.role && opt.sameUser && id == uid) {
        isAuthorized = true
        break
      }
      if (opt.role === role) isAuthorized = true
      if (!opt.sameUser) continue
      if (opt.role === role && id != uid) isAuthorized = false
      if (isAuthorized) break
    }
    isAuthorized ? next() : res.status(401).json({ message: 'Unauthorized' })
  }
}
