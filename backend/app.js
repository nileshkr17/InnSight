const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const User = require('./models/userModel');
const PORT = process.env.PORT || 6969;

mongoose.connect(process.env.MONGODB_URI,
).then(()=>{
  console.log(`Mongo DB connect`)
}).catch((error)=>{
  console.log();
  console.log(`Kuch to problem hai while connection mongodb`,error)
})


app.use(express.json());

app.get('/',(req,res)=>{
  res.send("Hello World");
})
app.post('/api/addUser', async (req, res) => {
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

    const user = new User({
      username,
      email,
      password,
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



app.get('/api/getAllUsers', async (req, res) => {
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

app.get('/api/user/:username', async (req, res) => {
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

app.put('/api/user/:username', async (req, res) => {
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

app.delete('/api/user/:username', async (req, res) => {
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


app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);

})

