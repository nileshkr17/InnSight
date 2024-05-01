const mongoose = require("mongoose");
const hotelcheck = new mongoose.Schema({
    _id: {
      $oid: String // MongoDB Object ID
    },
    additional_info: String,
    address: String,
    area: String,
    city: String,
    img_url: String,
    country: String,
    crawl_date: String,
    guest_recommendation: Number,
    hotel_brand: String,
    hotel_category: String,
    hotel_description: String,
    hotel_facilities: String,
    hotel_star_rating: Number,
    image_count: Number,
    latitude: Number,
    rate_perNight: Number,
    locality: String,
    longitude: Number,
    pageurl: String,
    point_of_interest: String,
    property_id: String,
    property_name: String,
    property_type: String,
    province: String,
    qts: String,
    query_time_stamp: String,
    review_count_by_category: String,
    room_area: String,
    room_count: Number,
    room_facilities: String,
    room_type: String,
    similar_hotel: String,
    site_review_count: Number,
    site_review_rating: Number,
    site_stay_review_rating: String,
    sitename: String,
    state: String,
    uniq_id: String
  });
  module.exports = mongoose.model("HotelCheck", hotelcheck);