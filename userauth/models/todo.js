// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   photo: String, // Image path
// }, { timestamps: true });

// module.exports = mongoose.model('Todo', todoSchema);

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    photo: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
