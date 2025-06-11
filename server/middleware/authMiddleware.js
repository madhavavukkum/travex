const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user.roles.some(role => roles.includes(role))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { protect, restrictTo };