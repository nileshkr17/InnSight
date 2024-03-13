const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if(user.isLoggedIn){
      return res.status(401).json({ message: 'User is already logged in' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.isLoggedIn = true;
    await user.save();
  console.log(user);

    res.setHeader('Authorization', `Bearer ${token}`);
    console.log(token);


    res.status(200).json({ message:"User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});


router.post('/logout', async (req, res) => {
 
    const user = await User.findOne({ username: req.body.username });
    try { if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if(!user.isLoggedIn){
      return res.status(401).json({ message: 'User is not logged in' });
    }
    user.isLoggedIn = false;
    await user.save();
  console.log(user);

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
});
module.exports = router;
