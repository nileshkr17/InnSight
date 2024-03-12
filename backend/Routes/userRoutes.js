const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();


router.post('/api/addUser', async (req, res) => {
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
      } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
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
      });
  
      await user.save();
  
      res.status(201).send("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
  
router.get('/api/getAllUsers', async (req, res) => {
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
  
router.get('/api/user/:username', async (req, res) => {
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
  
  router.put('/api/user/:username', async (req, res) => {
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
  
  router.delete('/api/user/:username', async (req, res) => {
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