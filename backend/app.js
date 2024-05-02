const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const hotelRoutes = require("./Routes/hotelRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// stripe

// const { cookies } = require("next/headers");
const app = express();
app.use(cors());




const PORT = process.env.PORT || 6969;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Mongo DB connect`);
  })
  .catch((error) => {
    console.log();
    console.log(`Kuch to problem hai while connection mongodb`, error);
  });

app.use(express.json());
// app.use(cookies());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const stripe = require('stripe')('pk_test_51PC3d9SBq8bDCNk46xmJEjB8n42JCilaKmLUcl3kFf48r1cxDiFdzYA6Bt3ALQEfXVLF7BZwPiyvEQpPr8ouszgv00Y4Qefh1y');

// Define a route for processing payments
app.post('/process-payment', async (req, res) => {
  const { token } = req.body;

  try {
    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: token,
      confirm: true,
    });

    // Return the payment intent status to the client
    res.json({ status: paymentIntent.status });

  } catch (error) {
    console.error('Error processing payment:', error); // Log the error
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
  
});

app.use("/api", userRoutes);
app.use("/hotel", hotelRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
