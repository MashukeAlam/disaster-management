const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // `req.user` contains the user information set during login
    return res.json({ user: req.user });
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;