const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id
  });
  if (!task) return res.status(404).json({ msg: "Task not created" });
  res.status(201).json({ msg: "Task created" , Task: task });
};

// Get All Tasks (user-specific)
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  if (!tasks) return res.status(404).json({ msg: "No tasks found" });
  res.status(200).json({ msg: "Tasks fetched" , tasks: tasks });
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  const task = await Task.findOne({ id: req.params._id,});
  if (!task) return res.status(404).json({ msg: "Task not found" });
  res.status(200).json({ msg: "Task fetched" , Task: task });
};

// Update Task
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ msg: "Task not found" });
  res.status(200).json({ msg: "Task updated" , Task: task });
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!task) return res.status(404).json({ msg: "Task not found" });

  res.json({ msg: "Deleted", Task: task });
};