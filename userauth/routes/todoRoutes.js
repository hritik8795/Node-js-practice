const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.use(authMiddleware); // Protect all routes

router.post("/", upload.single("photo"), createTodo);
router.get("/", getTodos);
router.put("/:id", upload.single("photo"), updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
