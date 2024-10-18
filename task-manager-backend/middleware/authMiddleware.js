const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' prefix
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Fetch full user details from the database

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Set the full user object in req.user
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
