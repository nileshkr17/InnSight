// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.send('<h1>Welcome to InnSight Backend!</h1>');
});
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`);

})
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB Connected !');
//     app.listen(PORT, () => {
//       console.log(`Yieepppppp Less GO!! ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Kuch to error hai while connecting to mongoDB:', error);
//   });
