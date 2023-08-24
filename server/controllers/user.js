const User = require("../models/User");

const register = async (req, res, next) =>{
  try {
    const { email, password } = req.body;
    // check if user already exists
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      res.status(400).json({message:'Tài khoản đã tồn tại'})
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, result) => {
      if (err) {
        console.error('Error querying MongoDB:', err);
        res.status(500).json({ message: 'Internal server error' })
        return;
      }
      
      if (result) {
        if (password === result.password) {
          req.session.user = result;
          res.status(200).send(result);
        } else {
          res.json({ message: 'Sai mật khẩu' })
        }
      } else {
        res.json({ message: 'Tài khoản không tồn tại' })
      }
    })

  }catch (error) {
    console.log(error);
    return next(error);
  }
}



module.exports = {
  register,
  login,
};