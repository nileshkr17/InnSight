/* eslint-disable no-unused-vars */
import React from "react";
import "./Card.css";
// import axios from "axios";
import PropTypes from "prop-types";

const Card = ({ hotel }) => {
  const {

    uniq_id,
    rate_perNight,
    hotel_star_rating,
    property_name,
    hotel_facilities,
    img_url,
    city,
    amenities,
    latitude,
    pricePerNight,
    longitude
  } = hotel;
  

  function limitWords(text, limit) {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  }
  return (
    <div className="card">
      <div className="cursor-pointer">
        <a href={`/hotel/${uniq_id}`} className="block hotel-link">
          <img src={img_url} alt={property_name} className="hotel-image" />
        </a>
      </div>
      <div className="hotel-details">
        <div>
          <a href={`/hotel/${uniq_id}`} className="block hotel-link">
            <h4 className="hotel-name">{property_name}</h4>
          </a>
          <p className="hotel-location">{city}</p>
          <p className="hotel-facilities" id="limited-facilities">{limitWords(hotel_facilities, 15)}</p>
          <a href={`https://maps.google.com/?q=${latitude},${longitude}`} target="_blank">
    <img src="https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png" alt="locate icon" width="20" height="20" />
    Locate Us
  </a>
        </div>
        <ul className="amenities-list">
          {/* {amenities &&
            amenities.map((amenity, index) => ( */}
              <li  className="amenity">
                {/* {amenity} */}
                one              </li>
            {/* ))} */}
        </ul>
      </div>
      <div className="booking-info">
        <div className="rating">
          <h4 className="rating-value">
            {hotel_star_rating} <span className="star">&#9733;</span>
          </h4>
          <p className="price">₹ {rate_perNight}</p>
        </div>
        <button className="book-now-btn">Book now</button>
      </div>
    </div>
  );
};

Card.propTypes = {
  hotel: PropTypes.shape({
    uniq_id: PropTypes.string.isRequired,
    property_name: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    hotel_facilities: PropTypes.arrayOf(PropTypes.string),
    hotel_star_rating: PropTypes.number.isRequired,
    rate_perNight: PropTypes.number.isRequired,
  }).isRequired,
};



export default Card;
