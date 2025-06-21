const mongoose = require("mongoose");
const userSchema = new mongoose.schema(
  {
    name: {
      type: string,
      required: true,
      minlength: 3,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      lowecase: true,
    },
    password: {
      type: string,
      required: true,
      minlength: 6,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("AuthUser", userSchema);
