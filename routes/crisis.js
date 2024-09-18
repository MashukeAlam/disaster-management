const express = require('express');
const router = express.Router();
const { Crisis, Location, CrisisType } = require('../models');

// Get all crises
router.get('/crises', async (req, res) => {
  try {
    const crises = await Crisis.findAll();
    res.status(200).json(crises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new crisis
router.post('/crises', async (req, res) => {
  const { locationId, crisisTypeId } = req.body;

  if (!locationId || !crisisTypeId) {
    return res.status(400).json({ message: 'Location ID and Crisis Type ID are required.' });
  }

  try {
    const newCrisis = await Crisis.create({ locationId, crisisTypeId });
    res.status(201).json(newCrisis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
