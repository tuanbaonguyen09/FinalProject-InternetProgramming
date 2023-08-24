const User = require("../models/User");

const register = async (req, res, next) =>{
  try {
    const { email, password } = req.body;
    // check if user already exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      res.json({message:'Tài khoản đã tồn tại'})
    }

    const user = await User.create({
      email, password
    });

    res.status(200).json({
      message: 'Đăng ký tài khoản thành công !',
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = {
  register,
};