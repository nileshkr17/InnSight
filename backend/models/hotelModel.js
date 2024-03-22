const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
//   random generated 5 alpha numeric hotel id
  
  hotelId: {
    type:String,
    default: Math.random().toString(36).substring(2, 7).toUpperCase(),
    unique: true
  },
  hotelAdminName: { type: String },
  hotelAdminId:{type:String},
  hotelBanner: { type: String },
  hotelImages: [{ type: String }],
  hotelDescription: { type: String },
  hotelName: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  amenities: [{ type: String }],
  rating: { type: Number, default: 0 },
  numberOfRooms: { type: Number, default: 0 },
  pricePerNight: { type: Number, required: true },
  contactNumber: { type: String },
  email: { type: String },
  website: { type: String },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number },
      comment: { type: String },
    },
  ],
  availability: {
    startDate: { type: Date },
    endDate: { type: Date },
  },
  wifi: { type: Boolean, default: false },
  doctor24x7: { type: Boolean, default: false },
  petAllowed: { type: Boolean, default: false },
  marriedCoupleFriendly: { type: Boolean, default: false },
  unmarriedCoupleFriendly: { type: Boolean, default: false },
  oldAgeFriendly: { type: Boolean, default: false },
  journeyStartDate: { type: Date, required: true },
  journeyEndDate: { type: Date, required: true },
  preferredLocation: { type: String },
  transportPublic: {
    airport: { type: Number },
  },
  poolGymBar: { type: Boolean, default: false },
  userList: [
    {
      bookingId: {
        type: String,
        default: Math.random().toString(36).substring(2, 10).toUpperCase()
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      checkIn: { type: Date },
      checkOut: { type: Date },
      numberOfRooms: { type: Number },
      numberOfPeople: { type: Number },
      totalAmount: { type: Number },
      paymentStatus: { type: String, default: "Pending" },
      paymentType: { type: String },
      paymentId: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },

//  data of user who booked the hotel add user data in the array 
    
});

module.exports = mongoose.model("Hotel", hotelSchema);
