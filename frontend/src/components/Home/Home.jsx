import React from "react";
import "./Home.css";
import GlobalSearch from "../SearchBar/GlobalSearch";
import Partners from "../Partners/Partners";
// import Card from "../HotelCard/Card";
import HotelList from "../HotelCard/HotelList";

const Home = () => {
  return (
    <>
      {/* hero banner for hotel booking */}
      <div className="hero-banner">
        <div className="banner-text">
          <h1>Plan your perfect stay around the globe</h1>
          <p>Book your dream hotel at the best price</p>
          <GlobalSearch />
        </div>
      </div>
      <Partners />
      {/* hotel cards */}
      <div className="hotel-cards">
        {/* <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/> */}
        <HotelList />
      </div>
    </>
  );
};

export default Home;
