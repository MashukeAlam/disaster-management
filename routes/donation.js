const express = require('express');
const {Donation, User, Crisis, Merchant} = require('../models');

const router = express.Router();

router.get('/donations',  async (req, res) => {
  try {
    const donations = await Donation.findAll({
      include: [
        { model: User, attributes: ['id', 'name'] }, 
        { model: Crisis, attributes: ['id', 'name'] }, 
        { model: Merchant, attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching donations.' });
  }
});

router.post('/donation',  async (req, res) => {
  const { amount, userId, crisisId, merchantId } = req.body;
  console.log(req.body);
  

  try {
    if (!amount || !merchantId) {
      return res.status(400).json({ error: 'Amount and Merchant ID are required.' });
    }

    const newDonation = await Donation.create({
      amount,
      userId,
      crisisId,
      merchantId
    });

    res.status(201).json(newDonation);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'An error occurred while creating the donation.' });
  }
});

module.exports = router;

