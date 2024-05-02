import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
import GlobalSearch from "../SearchBar/GlobalSearch";
import Partners from "../Partners/Partners";
import HotelList from "../HotelCard/HotelList";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const { isAuthenticated, userDetails } = useContext(AuthContext);

  const [searchCriteria, setSearchCriteria] = useState({
    city: "",
    purpose: "",
  });
  const [hotels, setHotels] = useState([]);
  const [recommendedHotels, setRecommendedHotels] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSearchCriteria(prevSearchCriteria => ({
      ...prevSearchCriteria,
      [name]: value,
    }));

    console.log("Search Criteria are:", searchCriteria);
  };

  const handleSearch = async () => {
    try {
      console.log("User Details:", userDetails);
      console.log("Search Criteria:", searchCriteria);
      const response = await axios.post("http://localhost:5000/hotels/input", {
        city: searchCriteria.city,
        facilities: searchCriteria.purpose,
      });
      console.log("Response:", response.data);
      setRecommendedHotels(response.data.hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  if (!isAuthenticated) {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/hotels");
        setHotels(response.data.hotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }

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
              placeholder={isAuthenticated ? userDetails.location : "City"}
              name="city"
              value={
                 searchCriteria.city
              }
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
        {isAuthenticated ? (
          { recommendedHotels } ? (
            <>
              <h2>Recommended Hotels</h2>
              <HotelList hotels={recommendedHotels} />
            </>
          ) : (
            <>
              <h2>Hotel List</h2>
              <HotelList hotels={hotels} />
            </>
          )
        ) : (
          <>
            <h2>Hotel List</h2>
            <HotelList hotels={hotels} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
