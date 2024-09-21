const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to list all users where isAdmin is false
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        isAdmin: false
      }
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/totalVolunteers', async (req, res) => {
  try {
    const number = await User.count({
      where: {
        isAdmin: false
      }
    });
    console.log(number);
    
    res.status(200).json(number);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
