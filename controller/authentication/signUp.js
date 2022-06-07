const { User } = require('../../models')
const { validationHandler } = require('../../utils/')

// class AuthController {
//   static async register(req, res) {
//     try {
//       const { email, password } = req.body;
//       const isEmailExist = await User.findOne({ where: { email } });
//       if (isEmailExist)
//         return res
//           .status(400)
//           .json({ status: 201, message: "Email already taken" });

//       const payload = { email, password };
//       const user = await User.create(payload);
//       const biodata = await Biodata.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         address: req.body.address,
//         userId: user.id,
//       });
//       return res.status(201).json({ status: 201, message: "user created" });
//     } catch (error) {
//       res.status(400).json({ error });
//     }
//   }
// }
// module.exports = AuthController;

module.exports = async (req, res) => {
  try {
    console.log('buat user')
    const { role, ...body } = req.body
    console.log(body.provider)
    if (body.provider && body.provider !== 'credentials') {
      body.password = `${body.email}${Math.random()}`
    }
    const user = await User.create(body)
    return res.status(201).json(user)
  } catch (err) {
    const error = validationHandler(err)
    error
      ? res.status(400).json(error)
      : res.status(500).json({ message: error.message })
  }
}
