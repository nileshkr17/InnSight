import React from 'react';
import './Card.css';

const Card = () => {

  // fetch data from backend to display hotel details in card format from http://127.0.0.1:5000/hotels


  return (
    <div className="card">
      <div className="cursor-pointer">
        <a href="/hotel/71222" className="block hotel-link">
          <img src="https://staybooker.netlify.app/images/hotels/481481762/481481762.jpg" alt="Hyatt Pune Hotel" className="hotel-image" />
        </a>
      </div>
      <div className="hotel-details">
        <div>
          <a href="/hotel/71222" className="block hotel-link">
            <h4 className="hotel-name">Hyatt Pune</h4>
          </a>
          <p className="hotel-location">Kalyani Nagar, Pune | 3.3 kms from city center</p>
        </div>
        <ul className="amenities-list">
          <li className="amenity">Free cancellation</li>
          <li className="amenity">No prepayment needed – pay at the property</li>
        </ul>
      </div>
      <div className="booking-info">
        <div className="rating">
          <h4 className="rating-value">5 <span className="star">&#9733;</span></h4>
          <p className="price">₹ 18,900</p>
        </div>
        <button className="book-now-btn">Book now</button>
      </div>
    </div>
  );
}

export default Card;
