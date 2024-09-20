const express = require('express');
const router = express.Router();
const { Crisis, CrisisType, Location } = require('../models');
const ensureAuthenticated = require('../misc/ensureAuthenticated');

router.get('/crises', async (req, res) => {
  try {
    const crises = await Crisis.findAll({
      include: [
        {
          model: CrisisType,
          as: 'crisisType',
          attributes: ['id', 'name']
        },
        {
          model: Location,
          as: 'location',
          attributes: ['id', 'name']
        }
      ]
    });
    res.status(200).json(crises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/crisisTypes', async (req, res) => {
  try {
    const crisisTypes = await CrisisType.findAll({
      attributes: ['id', 'name']  // specify the columns you want to return
    });
    res.status(200).json(crisisTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving crisis types', error: error.message });
  }
});



// Create a new crisis
router.post('/crises', ensureAuthenticated, async (req, res) => {
  const { locationId, crisisTypeId, severity, isApproved } = req.body;

  console.log(req.body);
  

  if (!locationId || !crisisTypeId) {
    return res.status(400).json({ message: 'Location ID and Crisis Type ID are required.' });
  }

  try {
    const newCrisis = await Crisis.create({ locationId, crisisTypeId, severity, isApproved });
    res.status(201).json(newCrisis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
