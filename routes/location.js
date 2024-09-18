const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
