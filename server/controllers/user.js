const User = require("../models/User");

const register = async (req, res) =>{
  try {
    const { email, password } = req.body;
    // check if user already exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      res.status(404).json({message:'Tài khoản đã tồn tại'})
    }

    const user = await User.create({
      email, password
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = {
  createUser,
  register,
};