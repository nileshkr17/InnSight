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
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: Math.floor(100000 + Math.random() * 900000),
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  bookingHistory: [
    {
      bookingDate: Date,
      checkIn: Date,
      checkOut: Date,
      totalFare: Number,
      numberOfRooms: Number,
      numberOfPeople: Number,
      totalAmount: Number,
      hotelName: String,
      paymentStatus: String,
      paymentType: String,
      paymentId: String,
    },
  ],

  reviews: [
    {
      hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
      rating: Number,
      review: String,
    },
  ],
  hotelPreferences: {
    location: String,
    amenities: [String],
    priceRange: {
      min: Number,
      max: Number,
    },
    wifi: {
      type: Boolean,
      default: false,
    },
    doctor24x7: {
      type: Boolean,
      default: false,
    },
    petAllowed: {
      type: Boolean,
      default: false,
    },
    marriedCoupleFriendly: {
      type: Boolean,
      default: false,
    },
    unmarriedCoupleFriendly: {
      type: Boolean,
      default: false,
    },
    oldAgeFriendly: {
      type: Boolean,
      default: false,
    },
    journeyStartDate: {
      type: Date,
      required: false,
    },
    journeyEndDate: {
      type: Date,
      required: false,
    },
    preferredLocation: {
      type: String,
    },
    trasportPublic: {
      airport: Number,
      busStand: Number,
      railwayStation: Number,
    },
    poolGymBar: {
      type: Boolean,
      default: false,
    },
    bookmarkHotels: [{}],
  },
});

const User_data = mongoose.model("User", userModel);

module.exports = User_data;
