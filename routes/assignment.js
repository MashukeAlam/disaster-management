const express = require('express');
const router = express.Router();
const Assignment  = require('../models/Assignment'); 

// Get all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update assignment
router.put('/assignments/:id', async (req, res) => {
  const { id } = req.params;
  const { assignedTask, locationId } = req.body;
  
  console.log(id, assignedTask, locationId);
  
  try {

    console.log("here");
    const assignment = await Assignment.findOne({ where: { userId: id } });
    console.log(assignment);
    
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
