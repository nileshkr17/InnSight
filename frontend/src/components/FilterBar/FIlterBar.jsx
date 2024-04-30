import React, { useState } from "react";
import Checkbox from "../checkbox/Checkbox";

// eslint-disable-next-line react/prop-types
const FilterBar = ({ hotels, setFilteredHotels }) => {
  const [ratingFilter, setRatingFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);

  // Function to handle changes in the rating filter
  const handleRatingChange = (event) => {
    const rating = parseFloat(event.target.value);
    setRatingFilter(rating);
    applyFilters(rating, priceFilter);
  };

  // Function to handle changes in the price filter
  const handlePriceChange = (event) => {
    const price = parseFloat(event.target.value);
    setPriceFilter(price);
    applyFilters(ratingFilter, price);
  };

  // Function to apply filters and update the filtered hotels
  const applyFilters = (rating, price) => {
    // eslint-disable-next-line react/prop-types
    const filteredHotels = hotels.filter((hotel) => {
      // Filter by rating
      if (rating !== null && hotel.rating < rating) {
        return false;
      }
      // Filter by price
      if (price !== null && hotel.price > price) {
        return false;
      }
      return true;
    });
    setFilteredHotels(filteredHotels);
  };

  let i = 1;

  return (
    <div
      className={`hotels-filters__container shadow-lg border w-[240px] z-10 absolute top-10 left-2 bg-white md:block md:static md:shadow-none `}
      data-testid="vertical-filters"
    >
      <div className="hotels-filters__header flex justify-between items-center py-2 border-b-2  px-4">
        <h4 className="text-base font-bold text-slate-600 uppercase">
          Filters
        </h4>
        <button
          className={`text-sm inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          // onClick={onClearFiltersAction}
        >
          Clear
        </button>
      </div>
      {/* {filtersData.map((filter) => ( */}
      <div className="border-b-2">
        <h4 className="text-base font-bold text-slate-600 my-1 px-2">Rating</h4>
        {/* {filter.filters.map((subfilter) => ( */}
        <Checkbox
          key={i++}
          id={i++}
          label={`5 stars`}
          isSelected={false}
          filterId={i++}
          // onFiltersUpdate={}
        />
        <Checkbox
          key={i++}
          id={i++}
          label={`4 stars`}
          isSelected={false}
          filterId={i++}
          // onFiltersUpdate={}
        />
        <Checkbox
          key={i++}
          id={i++}
          label={`3 stars`}
          isSelected={false}
          filterId={i++}
          // onFiltersUpdate={}
        />
        {/* ))} */}
      </div>
      {/* ))} */}
    </div>
  );
};

export default FilterBar;
