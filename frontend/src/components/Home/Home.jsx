import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import GlobalSearch from "../SearchBar/GlobalSearch";
import Partners from "../Partners/Partners";
import HotelList from "../HotelCard/HotelList";

const Home = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    city: "",
    purpose: ""
  });
  const [hotels, setHotels] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prevSearchCriteria) => ({
      ...prevSearchCriteria,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/hotels/input", {
        city: searchCriteria.city,
        facilities: searchCriteria.purpose
      });
      console.log("Response:", response.data);
      setHotels(response.data.hotels); // Assuming 'hotels' is the key in the response data
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <>
      {/* hero banner for hotel booking */}
      <div className="hero-banner">
        <div className="banner-text">
          <h1>Plan your perfect stay around the globe</h1>
          <p>Book your dream hotel at the best price</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="City Name"
              name="city"
              value={searchCriteria.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Purpose"
              name="purpose"
              value={searchCriteria.purpose}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      <Partners />
      {/* hotel cards */}
      <div className="hotel-cards">
        {/* Pass hotels data to HotelList */}
        <HotelList hotels={hotels} />
      </div>
    </>
  );
};

export default Home;
