const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const generateOTP = require("../email/otp");
const transporter = require("../email/mailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/addUser", async (req, res) => {
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
      preferences,
    } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateOTP();

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
      preferences: {
        ...preferences,
      },
      verificationCode,
    });

    await transporter.sendMail({
      to: email,
      subject: "StayPlanner | Email Verification",
      html: `
        <h1>Hi ${username},</h1>
        <p>Thank you for registering with StayPlanner. Please verify your email by entering the following code:</p>
        <h2>${verificationCode}</h2>
        <p>Click <a href="http://localhost:5173/verify-email?email=${email}&verificationCode=${verificationCode}">here</a> to verify your email.</p>
        <br>
        <br>
        <br>
        <p>If you did not register with StayPlanner, please ignore this email.</p>
        <p>Thank you!</p>
        <p>StayPlanner Team</p>`,
    });
    await user.save();

    res.status(201).send("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// authRoutes.js

router.post("/verifyEmail", async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await User.findOne({ email, verificationCode });
  if (!user) {
    return res.status(400).send("Invalid verification code");
  }
  user.isVerified = true;
  await user.save();
  transporter.sendMail({
    to: email,
    subject: "InnSight | Email Verified",
    html: `<h1>Hi ${user.username},</h1>
    <p>Your email has been verified successfully.</p>
    <p>Thank you for choosing StayPlanner!</p>
    <p>StayPlanner Team</p>
    `,
  });
  res.status(200).send("Email verified successfully");
});

router.get("/getAllUsers", async (req, res) => {
  // to list all the users data , which will help us to see all the users data in admin panel ok??
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* username to find user because 
  in the userModel.js 
   username: {
      type: String,
      required: true,
      unique: true,
    }
    only unique value:
   */

router.get("/user/:username", async (req, res) => {
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

router.put("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const updatedUser = req.body;
    const user = await User.findOneAndUpdate({ username }, updatedUser, {
      new: true,
    });
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

router.delete("/user/:username", async (req, res) => {
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

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  const otp = generateOTP();
  user.verificationCode = otp;
  await user.save();
  await transporter.sendMail({
    to: email,
    subject: "StayPlanner | Password Reset",
    html: `
    <h1>Hi ${user.username},</h1>
    <p>Please reset your password by entering the following code:</p>
    <h2>${otp}</h2>
    <p>Click <a href="http://localhost:6969/api/resetPassword">here</a> to reset your password.</p>
    <br>
    <br>
    <br>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you!</p>
    <p>StayPlanner Team</p>`,
  });
  res.status(200).send("Password reset code sent successfully");
});

router.post("/resetPassword", async (req, res) => {
  const { email, verificationCode, password } = req.body;
  const user = await User.findOne({
    email,
    verificationCode,
  });
  if (!user) {
    return res.status(400).send("Invalid verification code");
  }
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  transporter.sendMail({
    to: email,
    subject: "StayPlanner | Password Reset Successful",
    html: `<h1>Hi ${user.username},</h1>
    <p>Your password has been reset successfully.</p>
    <p>Thank you for choosing StayPlanner!</p>
    <p>StayPlanner Team</p>
    `,
  });
  res.status(200).send("Password reset successfully");
});

router.post("/bookHotel", async (req, res) => {
  try {
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const {
      userDetails,
      hotels,
      // userId,
      // hotelId,
      // checkIn,
      // checkOut,
      // numberOfRooms,
      // numberOfPeople,
    } = req.body;
    // const userId = decodedToken.userId;
    console.log("after call");
    console.log(userDetails);

    // Fetch the user from the database
    console.log(hotels);
    // const currentUser = await User.findById(userDetails.userId);

    // const hotel = await Hotel.findById(hotels.hotelId);

    // Check if hotel exists
    console.log("find");
    // if (!hotel) {
    //   return res.status(400).send("Hotel not available for booking");
    // }

    // Check hotel capacity
    // if (hotel.numberOfRooms < numberOfRooms) {
    //   return res.status(400).send("Hotel capacity exceeded");
    // }

    // Update hotel's available rooms
    // hotel.numberOfRooms -= numberOfRooms;

    // Add booking details to hotel's userList
    // unique bookingid using uuid

    const currentbookingId = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    // not matching

    // hotel.userList.push({
    //   bookingId: currentbookingId,
    //   userId: currentUser._id,
    //   username: currentUser.username,
    //   email: currentUser.email,
    //   governmentId: currentUser.governmentId,
    //   whatsappContact: currentUser.whatsappContact,
    //   preferences: currentUser.preferences,
    //   checkIn: checkIn,
    //   checkOut: checkOut,
    //   numberOfRooms: numberOfRooms,
    //   numberOfPeople: numberOfPeople,
    //   totalAmount: hotel.pricePerNight * numberOfRooms,
    //   paymentType: "Pending",
    // });

    // Save updated hotel details
    console.log("before save");
    // await hotel.save();
    // update userdb
    // currentUser.bookingHistory.push({
    //   bookingId: currentbookingId,
    //   hotelId: hotel._id,
    //   hotelName: hotel.hotelName,
    //   checkIn: checkIn,
    //   checkOut: checkOut,
    //   numberOfRooms: numberOfRooms,
    //   numberOfPeople: numberOfPeople,
    //   totalAmount: hotel.pricePerNight * numberOfRooms,
    //   paymentStatus: "Pending",
    // });
    // await currentUser.save();
    // Send email to hotel admin

    // await transporter.sendMail({
    //   to: hotel.email, // Use hotel's email
    //   subject: "StayPlanner | Hotel Booked",
    //   html: `
    //   <h1>Hi ${hotel.hotelAdminName},</h1>
    //   <p>The following user has booked a hotel:</p>
    //   <table style="border: 1px solid #000;">
    //     <tr>
    //       <th>User</th>
    //       <th>Check-in</th>
    //       <th>Check-out</th>
    //       <th>Number of rooms</th>
    //       <th>Number of people</th>
    //       <th>Total amount</th>
    //     </tr>
    //     <tr>
    //       <td>${currentUser.username}</td>
    //       <td>${checkIn}</td>
    //       <td>${checkOut}</td>
    //       <td>${numberOfRooms}</td>
    //       <td>${numberOfPeople}</td>
    //       <td>${hotel.pricePerNight * numberOfRooms}</td>
    //     </tr>
    //   </table>
    //   <p>Thank you!</p>
    //   <p>Thank you for choosing StayPlanner!</p>
    //   <p>StayPlanner Team</p>
    //   `,
    // });

    // Send email to the user
    console.log("before mail");
    await transporter.sendMail({
      to: userDetails.email,
      subject: "StayPlanner | Hotel Booked",
      html: `
      <h1>Hi ${userDetails.username},</h1>
      <p>Please bring the government ID for verification</p>
      <p>You have successfully booked a hotel:</p>
      <p>Your Booking Id is:</p>
      <table border>
        <tr>
          <td>${currentbookingId}</td>
        </tr>
      <table>
      <table border>
        <tr>
          <th>Hotel</th>
          <th>Check-in</th>
          <th>Check-out</th>
          <th>Number of rooms</th>
          <th>Number of people</th>
          <th>Total amount</th>
        </tr>
        <tr>
          <td>${hotels.hotelName}</td>
          <td>${hotels.checkIn}</td>
          <td>${hotels.checkOut}</td>
          <td>7</td>
          <td>8</td>
          <td>${hotels.pricePerNight * 7}</td>
        </tr>
      </table>
      <p>Thank you for choosing StayPlanner!</p>
      <p>StayPlanner Team</p>
      `,
    });
    console.log("mail sent");

    res.status(200).send("Hotel booked successfully");
  } catch (error) {
    console.error("Error booking hotel:", error);
    res.status(500).send("Internal Server Error");
  }
});

// send mail to the admin with the hotel details in table form with good design using nodemailer and user details that booked the hotel

module.exports = router;
