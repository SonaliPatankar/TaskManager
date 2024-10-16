const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, 'username email'); // Fetch username and email fields only
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
});

module.exports = router;
