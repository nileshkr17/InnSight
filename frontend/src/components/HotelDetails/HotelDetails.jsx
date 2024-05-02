import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./HotelDetails.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import PaymentForm from "../Payment/PaymentForm";
const HotelDetails = () => {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { isAuthenticated } = useContext(AuthContext);
  const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6969/hotel/` + id);
        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }
        const hotelData = await response.json();
        setHotel(hotelData);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const calculateTotalPrice = () => {
    // Assuming rate_perNight is the price per night
    // Calculate the number of nights between check-in and check-out
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const numberOfNights =
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    // Calculate total price including tax
    const totalPrice = hotel.rate_perNight * numberOfNights;
    // Assuming tax is 10% of the total price
    const tax = totalPrice * 0.1;
    return totalPrice + tax;
  };

  const handleBookings = () => {
    // Navigate to /process-payment with the total price as a query parameter
    navigate(`/process-payment?price=${checkIn && checkOut ? calculateTotalPrice() : 0}`);
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotelparent">
      <div className="parent">
        <div className="right">
          <img src={hotel.img_url} alt={hotel.property_name} />
        </div>
        <div className="left">
          <button onClick={() => window.history.back()} className="backbtn">
            Back
          </button>
          <div className="detailhead">Hotel Details</div>
          <div className="hotel-location">{hotel.city}</div>
          <div className="room-count">{hotel.room_count} Rooms left</div>
          <div className="hotel-facilities">{hotel.hotel_facilities}</div>
          <div className="price-details">
            <label htmlFor="checkIn">Check-in:</label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <label htmlFor="checkOut">Check-out:</label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <p className="price">Per Day Rate:Rs. {hotel.rate_perNight}</p>
            <p>
              Total Price (incl. tax):{" "}
              {checkIn && checkOut ? calculateTotalPrice() : "Select dates"}
            </p>
            <span className="freecancel">
              {" "}
              Free cancellation 1 day prior to stay
            </span>
          </div>
          <button
            className="booknow"
            onClick={handleBookings}
            disabled={!isAuthenticated}
          >
          {isAuthenticated ? "Book Now" : "Log In to Book"}
          </button>
        </div>
      </div>
      <div className="hoteldetails">
        <div className="hotel-name">
          {hotel.property_name}
          <h4 className="rating-value">
            {hotel.hotel_star_rating} <span className="star">⭐</span>
          </h4>
        </div>
        <div className="site-stay-review">
          <h2>Site Stay Review Ratings</h2>
          <span className="review">{hotel.site_stay_review_rating}</span>
        </div>
        <div className="description">
          <h4>Description</h4>
          <p>{hotel.hotel_description}</p>
        </div>
      </div>
      {/* Conditionally render PaymentForm component only when hotel data is available */}
      
    </div>
  );
};

export default HotelDetails;
