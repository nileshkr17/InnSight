/* eslint-disable no-unused-vars */
import React from "react";
import "./Card.css";
// import axios from "axios";
import PropTypes from "prop-types";

const Card = ({ hotel }) => {
  const {
    hotelId,
    hotelName,
    hotelBanner,
    location,
    amenities,
    rating,
    pricePerNight,
  } = hotel;
  // fetch data from backend to display hotel details in card format from http://127.0.0.1:5000/hotels
  // return (
  //   <div className="card">
  //     <div className="cursor-pointer">
  //       <a href="/hotel/71222" className="block hotel-link">
  //         <img src="https://staybooker.netlify.app/images/hotels/481481762/481481762.jpg" alt="Hyatt Pune Hotel" className="hotel-image" />
  //       </a>
  //     </div>
  //     <div className="hotel-details">
  //       <div>
  //         <a href="/hotel/71222" className="block hotel-link">
  //           <h4 className="hotel-name">Hyatt Pune</h4>
  //         </a>
  //         <p className="hotel-location">Kalyani Nagar, Pune | 3.3 kms from city center</p>
  //       </div>
  //       <ul className="amenities-list">
  //         <li className="amenity">Free cancellation</li>
  //         <li className="amenity">No prepayment needed – pay at the property</li>
  //       </ul>
  //     </div>
  //     <div className="booking-info">
  //       <div className="rating">
  //         <h4 className="rating-value">5 <span className="star">&#9733;</span></h4>
  //         <p className="price">₹ 18,900</p>
  //       </div>
  //       <button className="book-now-btn">Book now</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="card">
      <div className="cursor-pointer">
        <a href={`/hotel/${hotelId}`} className="block hotel-link">
          <img src={hotelBanner} alt={hotelName} className="hotel-image" />
        </a>
      </div>
      <div className="hotel-details">
        <div>
          <a href={`/hotel/${hotelId}`} className="block hotel-link">
            <h4 className="hotel-name">{hotelName}</h4>
          </a>
          {/* <p className="hotel-location">
            {hotel.location} | {hotel.distance} kms from city center
          </p> */}
          <p className="hotel-location">{location}</p>
        </div>
        <ul className="amenities-list">
          {amenities &&
            amenities.map((amenity, index) => (
              <li key={index} className="amenity">
                {amenity}
              </li>
            ))}
        </ul>
      </div>
      <div className="booking-info">
        <div className="rating">
          <h4 className="rating-value">
            {rating} <span className="star">&#9733;</span>
          </h4>
          <p className="price">₹ {pricePerNight}</p>
        </div>
        <button className="book-now-btn">Book now</button>
      </div>
    </div>
  );
};

Card.propTypes = {
  hotel: PropTypes.shape({
    hotelId: PropTypes.string.isRequired,
    hotelName: PropTypes.string.isRequired,
    hotelBanner: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number.isRequired,
    pricePerNight: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
