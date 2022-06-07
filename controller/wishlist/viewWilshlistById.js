const { User, Product } = require('../../models')

module.exports = async (req, res) => {
  try {
    const userId = req.query.userId
    const viewWishlist = await User.findAll({
      include: {
        model: Product,
        as: 'product_wishlist',
      },
      where: {
        id: userId,
      },
    })
    const wishlistData = viewWishlist[0].product_wishlist
    if (wishlistData.length == 0) return null
    return res.status(200).send(wishlistData)
  } catch (error) {
    console.log(error)
  }
}
