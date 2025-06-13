const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('JWT Token:', token); // Debug: Log the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', JSON.stringify(decoded, null, 2)); // Debug: Log the decoded payload

      // Validate user exists
      if (!mongoose.isValidObjectId(decoded.userId)) {
        console.error('Invalid userId in decoded token:', decoded.userId);
        return res.status(401).json({ message: 'Not authorized, invalid user ID' });
      }

      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        console.error('User not found for userId:', decoded.userId);
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // Set req.user with decoded data
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        email: decoded.email,
        roles: decoded.roles,
      };
      console.log('req.user set:', JSON.stringify(req.user, null, 2)); // Debug: Log req.user
      next();
    } catch (error) {
      console.error('Auth error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.error('No token provided in Authorization header');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const restrictTo = (...roleIds) => {
  return (req, res, next) => {
    if (!req.user.roles.some(roleId => roleIds.includes(roleId))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };