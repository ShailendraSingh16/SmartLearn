const jwt = require('jsonwebtoken');
const User = require('../models/User');

// check if logged in
exports.authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Access denied, no headers are present',
    });
  }

  const token = authHeader.split(' ')[1];

  // console.log(token);

  if (!token) {
    return res.status(401).json({
      message: 'Access denied, please provide a token',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log('decoded: ', decoded);

    const user = await User.findOne({ _id: decoded.id }).select('-password');

    // console.log('user :', user);

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      message: error,
    });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied, you need admin privileges',
    });
  }

  next();
};

// Check if user is author
exports.isAuthor = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'author') {
    return res.status(403).json({
      message: 'Access denied, you need author privileges',
    });
  }

  next();
};

exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    console.log('Role: ', userRole); // Assuming the user role is stored in req.user.role

    // Check if the user role matches any of the required roles
    const isAuthorized = roles.includes(userRole);

    if (!isAuthorized) {
      return res.status(403).json({
        message: 'Access denied',
      });
    }

    next(); // Move to the next middleware or route handler
  };
};
