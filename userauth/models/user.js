const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    otp: String,
    otpExpiry: Date,
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
