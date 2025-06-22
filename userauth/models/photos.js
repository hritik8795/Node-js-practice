const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    filename: String,
    filepath: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Photo", photoSchema);
