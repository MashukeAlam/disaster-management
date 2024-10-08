const express = require('express');
const router = express.Router();
const passport = require('../config/auth');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
