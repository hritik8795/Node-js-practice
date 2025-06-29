const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists" });
    const hashesPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashesPassword });
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "password does not match " });

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successfull", token });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;
  try {
    const user = await User.find({ email, otp });
    console.log("this is user ", user);
    if (!user || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "invalide user credential" });
    }
    console.log("hello i am debugging", newpassword);
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    console.log("hello i am debugging", hashedPassword);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    res.json({ message: "password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  console.log("Received body:", req.body);

  const { email, otp, newpassword } = req.body;

  // Validate input
  if (!email || !otp || !newpassword) {
    return res
      .status(400)
      .json({ message: "Email, OTP, and new password are required" });
  }

  try {
    // Find user by email and otp
    const user = await User.findOne({ email, otp });

    // If user not found or OTP is expired
    if (!user) {
      return res.status(400).json({ message: "Invalid email or OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    // Update user's password and clear OTP fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// exports.resetPassword = async (req, res) => {
//   const { email, otp, newpassword } = req.body;

//   console.log("🔍 req.body:", req.body);
//   console.log("📧 email:", email);
//   console.log("🔐 otp:", otp);
//   console.log("🆕 newpassword:   eeereere", newpassword);

//   // Check for missing fields
//   if (!email || !otp || !newpassword) {
//     return res.status(400).json({
//       message: "Email, OTP, and new password are required",
//       received: req.body, // helpful for debugging
//     });
//   }

//   try {
//     const user = await User.findOne({ email, otp });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or OTP" });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     const hashedPassword = await bcrypt.hash(newpassword, 10);

//     user.password = hashedPassword;
//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     await user.save();

//     return res.status(200).json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("❌ Error resetting password:", err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };
