const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');

router.post('/register', async (req, res) => {
  const {username, email, password} = req.body;
  console.log(req.body);
  

  if (!username || !email || !password) return res.status(400).json({message: 'All fields are required.'});

  const user = await User.findOne({where: {email}});
  console.log(user);
  
  if (user) return res.status(400).json({ message: 'User with same name exists!' });

  const hashKey = await bcrypt.hash(password, 9);  

  try {    
    await User.create({
      username, 
      email,
      password: hashKey
    });

    res.status(200).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({message: err.message });
  }
});

module.exports = router;