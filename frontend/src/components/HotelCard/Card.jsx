import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Card.css";
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
    latitude,
    longitude,
  } = hotel;

  function limitWords(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="card">
      <div className="cursor-pointer">
        {/* Wrap the card in a Link component and pass hotel details as route parameters */}
        <Link
          to={{
            pathname: `/hotel/${uniq_id}`,
            state: { hotel }, // Pass the hotel object as state
          }}
          className="block hotel-link"
        >
          <img src={img_url} alt={property_name} className="hotel-image" />
        </Link>
      </div>
      <div className="hotel-details">
        <div>
          <Link
            to={{
              pathname: `hotel/${uniq_id}`,
            }}
          >
            <h4 className="hotel-name">{property_name}</h4>
          </Link>
          <p className="hotel-location">{city}</p>
          <p className="hotel-facilities" id="limited-facilities">
            {limitWords(hotel_facilities, 15)}
          </p>
        </div>
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
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
