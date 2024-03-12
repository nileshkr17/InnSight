const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
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

app.use('/api', userRoutes);

app.use('/auth', authRoutes);

app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);

})

