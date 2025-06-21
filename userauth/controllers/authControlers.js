const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
