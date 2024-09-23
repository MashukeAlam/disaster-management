const express = require('express');
const router = express.Router();
const Assignment  = require('../models/Assignment'); 
const ensureAuthenticated = require('../misc/ensureAuthenticated');
const { Location } = require('../models');

// Get all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific assignment by userId
router.get('/assignments/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const assignment = await Assignment.findOne({
      where: { userId: id },
      include: [
        {
          model: Location, 
          attributes: ['name'], 
        },
      ],
    });    
    res.status(200).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update assignment
router.put('/assignments/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { assignedTask, locationId } = req.body;
  
  
  try {

    const assignment = await Assignment.findOne({ where: { userId: id } });
    
    if (!assignment) {
      
      await Assignment.create({
        userId: id,
        task: assignedTask,
        locationId
      });
      
      res.status(201).json({ message: 'Assignment created successfully' });
      return;
    }
    
    assignment.assignedTask = assignedTask;
    assignment.locationId = locationId;

    await assignment.save();
    res.status(200).json({ message: 'Assignment updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
