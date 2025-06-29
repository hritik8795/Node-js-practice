const express = require("express");
const router = express.Router();
// const { register, login } = require('../controllers/authController');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControlers");

router.post("/signup", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
