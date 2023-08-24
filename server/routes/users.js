const express = require("express");
const {
  register,
} = require("../controllers/user");


const router = express.Router();

// create a user
router.post("/register", register);


module.exports = router;