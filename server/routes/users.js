const express = require("express");
const {
  register,
  login,
  loginCheck,
  logOut,
} = require("../controllers/user");


const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);
router.get("/login", loginCheck);

//LogOut

router.post("/logout", logOut)

module.exports = router;