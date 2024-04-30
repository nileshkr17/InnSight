import React from "react";
import "./GlobalSearch.css";
const GlobalSearch = () => {
  return (
    <>
      <div className="search-bar">
        <input type="text" placeholder="Search for hotels" />
        <input type="text" placeholder="Location" />
        <button>Search</button>
      </div>
    </>
  );
};

export default GlobalSearch;
