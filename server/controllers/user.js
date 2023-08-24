const User = require("../models/User");

const register = async (req, res, next) =>{
  try {
    const { email, password } = req.body;
    // check if user already exists
    const isUserExists = await User.findOne({ email })

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
    const {email, password } = req.body;

    const user = await User.findOne({ email })

    if(user){
      if(user.password === password){
        req.session.user = user;
        res.status(200).send(user);
      }else {
        res.json({ message: 'Sai mật khẩu' })
      }
    }else {
      res.json({ message: 'Tài khoản không tồn tại' })
    }

  }catch (error) {
    console.log(error);
    return next(error);
  }
}

const loginCheck = (req, res, next) => {
  try {
    if(req.session.user){
      res.json({loggedIn: true, user: req.session.user})
    }else {
      res.json({loggedIn: false})
    }

  }catch (error) {
    console.log(error);
    return next(error);
  }
}

const logOut =  (req, res, next) => {
  try{
    if(req.session.user){
      req.session.destroy((err) =>{
        if(err) throw err;
        res.json({message: "Đăng xuất thành công"})
      })
    }else {
      res.json({message: "Lỗi đăng xuất"})
    }
  }catch (error) {
    console.log(error);
    return next(error);
  }
  
}



module.exports = {
  register,
  login,
  loginCheck,
  logOut,
};
