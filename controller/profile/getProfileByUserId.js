const { User, Biodata } = require('../../models')

module.exports = async (req, res) => {
  try {
    const id = req.user.id
    const profileById = await User.findOne({
      where: { id },
      include: {
        model: Biodata,
        as: 'Biodata',
      },
    })
    console.log(id)
    res.status(200).send(profileById)
  } catch (error) {
    console.log(error)
  }
}
