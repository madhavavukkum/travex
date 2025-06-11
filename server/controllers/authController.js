const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Assign 'user' role by default, create role if it doesn't exist
    let userRole = await Role.findOne({ name: 'user' });
    if (!userRole) {
      userRole = await Role.create({ name: 'user', permissions: ['view_public'] });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [userRole._id],
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('roles');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email, roles: user.roles.map(role => role.name) },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, roles: user.roles.map(role => role.name) },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };