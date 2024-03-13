const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  governmentId: {
    type: {
      type: String,
      enum: ["PAN", "Aadhar"],
      required: true,
    },
    value: { type: String, required: true },
  },
  whatsappContact: {
    type: Number,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  paymentMethodAdded: {
    type: Boolean,
    default: false,
  },
  preferences: {
    budget: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    accessibility: {
      type: String,
      enum: ["Enabled", "Disabled"],
      default: "Enabled",
    },
    notifications: {
      type: String,
      enum: ["Email", "SMS", "Push Notification"],
      default: "Email",
    },
    language: {
      type: String,
      default: "English",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isLoggedIn:{
    type:Boolean,
    default:false
  }
});


const User_data = mongoose.model('User',userModel);

module.exports = User_data;
