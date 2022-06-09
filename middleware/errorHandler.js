module.exports = (error, req, res, next) => {
  const err = sequelizeValidation(error)
  err
    ? res.status(400).json(err)
    : res.status(500).json({ message: 'Internal server ERROR' })
}

function sequelizeValidation(err) {
  const errors = {}
  if (err.name === 'SequelizeValidationError') {
    err.errors.forEach((e) => {
      errors[e.path] = e.message
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    err.errors.forEach((e) => {
      errors[e.path] = `${e.path} already exist`
    })
  } else {
    return false
  }
  return errors
}
