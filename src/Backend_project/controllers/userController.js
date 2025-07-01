const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// LOGIN
const loginUser = async (req, res) => {
  try {
    console.log("Login attempt:", req.body);

    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });

    console.log("User found:", user);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json(user);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log(req.body);
    // ✅ Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // ✅ Create and save new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // ✅ Respond with token and user
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};


// GET USER DATA
const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, getUserData, loginUser };