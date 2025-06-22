const Todo = require("../models/todo");
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const photo = req.file ? req.file.filename : null;
    const todo = await Todo.create({
      user: req.user.id,
      title,
      description,
      photo,
    });
    res.status(201).json(todo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "error creating todo", error: err.message });
  }
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  const updateFields = {
    title: req.body.title,
    description: req.body.description,
  };
  console.log("this is updateFeilds", updateFields);
  if (req.file) {
    updateFields.photo = req.file.filename;
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user.id },
    updateFields,
    { new: true }
  );
  if (!todo)
    return res.status(404).json({ message: "Todo not found or unauthorize" });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
  if (!todo)
    return res.status(404).json({ message: "Todo nott found or unauthorized" });
  res.json({ message: "Todo deleted" });
};
