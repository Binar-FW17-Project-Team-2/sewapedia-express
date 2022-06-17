const db = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const review = await db.Review.create({
      userId: req.user.id,
      ...req.body,
    })
    res.status(200).json(review)
  } catch (error) {
    next(error)
  }
}
