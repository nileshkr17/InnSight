const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateOTP = require('../email/otp');
const transporter = require('../email/mailer')

const router = express.Router();


router.post('/addUser', async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        role,
        gender,
        location,
        governmentId,
        whatsappContact,
        preferences
      } = req.body;
      const existingUser = await User.findOne({username});
      if(existingUser){
        return res.status(400).json({message:"Username already exists"});
      }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode= generateOTP();
  
      const user = new User({
        username,
        email,
        password: hashedPassword,
        role,
        gender,
        location,
        governmentId: {
          type: governmentId.type, //sending governmentId as an object with 'type' and 'value' properties
          value: governmentId.value,
        },
        whatsappContact,
        preferences:{
          ...preferences
        },
        verificationCode
      });
  
      await user.save();
      await transporter.sendMail({
        to:email,
        subject:"InnSight | Email Verification",
        html:`<h1>Hi ${username},</h1>
        <p>Thank you for registering with InnSight. Please verify your email by entering the following code:</p>
        <h2>${verificationCode}</h2>
        <p>Thank you!</p>
        <p>InnSight Team</p>`

      });
      res.status(201).send("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).send("Internal Server Error");
    }
     

  });
  
  // authRoutes.js

router.post('/verifyEmail', async (req, res) => {
  const {email,verificationCode}=req.body;
  const user = await User.findOne({email,verificationCode});
  if(!user){
    return res.status(400).send("Invalid verification code");
  }
  user.isVerified=true;
  await user.save();
  transporter.sendMail({
    to:email,
    subject:"InnSight | Email Verified",
    html:`<h1>Hi ${user.username},</h1>
    <p>Your email has been verified successfully. You can now login to your account.</p>
    <p>Thank you!</p>
    <p>InnSight Team</p>`
  });
  res.status(200).send("Email verified successfully");
})
  
  
router.get('/getAllUsers', async (req, res) => {
    // to list all the users data , which will help us to see all the users data in admin panel ok??
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  );
  
  
  /* username to find user because 
  in the userModel.js 
   username: {
      type: String,
      required: true,
      unique: true,
    }

    only unique value:
   */
  
router.get('/user/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  router.put('/user/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const updatedUser = req.body;
      const user = await User.findOneAndUpdate({ username }, updatedUser, { new: true });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).send("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
  /* username to delete user because 
  in the userModel.js 
   username: {
      type: String,
      required: true,
      unique: true,
    }
  
    only unique value:
   */
  
  router.delete('/user/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOneAndDelete({ username });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).send("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = router;