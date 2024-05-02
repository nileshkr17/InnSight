import React, { useState, useEffect } from "react";
import "./AllHotels.css";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const hotelsPerPage = 10;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:6969/hotel/hotels");
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  // Get current hotels
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Change page
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
const displayPages = 10; // Number of pagination buttons to display
const halfDisplayPages = Math.floor(displayPages / 2);
const startPage = Math.max(1, currentPage - halfDisplayPages);
const endPage = Math.min(startPage + displayPages - 1, totalPages);

const pages = [];
for (let i = startPage; i <= endPage; i++) {
  pages.push(i);
}

  return (
    <div className="hotelbody">
    {loading ? (
        <div className="loader"></div> // Loading animation
      ) : (
        <>
      <div className="parent-search">
        <div className="search-bar-hotel">
          <input type="text" placeholder="City Name" />
          <input type="text" placeholder="Purpose" />
          <button>Search</button>
        </div>
        {/* filter high to low */}
        <div className="filter">
          <select>
            <option>Price: High to Low</option>
            <option>Price: Low to High</option>
          </select>
        </div>
        {/* filter with star one to 5 star */}
        <div className="filter">
          <select>
            <option>Star: 1</option>
            <option>Star: 2</option>
            <option>Star: 3</option>
            <option>Star: 4</option>
            <option>Star: 5</option>
          </select>
        </div>
      </div>

      <div className="hotel-list">
        {/* hotel card */}
        {currentHotels.map((hotel) => (
          <div className="card" key={hotel.uniq_id}>
            {/* Hotel image */}
            <div className="cursor-pointer">
              <img
                src={hotel.img_url}
                alt={hotel.property_name}
                className="hotel-image"
              />
            </div>
            {/* Hotel details */}
            <div className="hotel-details">
              <div>
                <h4 className="hotel-name">{hotel.property_name}</h4>
                <p className="hotel-location">{hotel.city}</p>
                <p className="hotel-facilities">
                  Near: {hotel.point_of_interest}
                </p>
              </div>
            </div>
            {/* Booking info */}
            <div className="booking-info">
              <div className="rating">
                <h4 className="rating-value">
                  {hotel.site_review_rating}{" "}
                  <span className="star">&#9733;</span>
                </h4>
                <p className="price">₹ {hotel.rate_perNight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
    </>
    )}
    </div>
  );
};

export default AllHotels;
