const { Category } = require('../../models')

module.exports = async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: { name: req.params.name },
    })
    res.status(200).json(category)
  } catch (error) {
    const err = validationHandler(error)
    err
      ? res.status(400).json(err)
      : res.status(500).json('Internal server Error')
  }
}
