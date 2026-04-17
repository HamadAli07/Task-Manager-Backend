const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  res.status(201).json({ msg: "User created" , User: user });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ msg: "User logged in" , token: token, User: user });
};

// Get All Users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).json({ msg: "No users found" });
  res.status(200).json({ msg: "Users fetched" , users: users });
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json({ msg: "User fetched" , User: user });
};

// Update User
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json({ msg: "User updated" , User: user });
};

// Delete User  
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json({ msg: "User deleted" , User: user });
};