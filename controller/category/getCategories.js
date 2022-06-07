const { Category } = require('../../models')

module.exports = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: ['name'],
    })
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json('Internal server ERROR')
  }
}
