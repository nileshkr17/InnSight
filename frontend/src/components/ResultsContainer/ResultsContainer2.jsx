// ResultsContainer.jsx
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import VerticalFilter from "../VerticalFilter/VerticalFilter";
import Card from "../HotelCard/Card";
// import FilterBar from "../FilterBar/FilterBar";
import Select from "react-select";

const ResultsContainer = (props) => {
  const {
    hotelsResults,
    enableFilters,
    // filtersData,
    selectedFiltersState,
    onFiltersUpdate,
    onClearFiltersAction,
    sortingFilterOptions,
    sortByFilterValue,
    onSortingFilterChange,
  } = props;

  const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);
  const wrapperRef = useRef();
  const buttonRef = useRef();

  const toggleVerticalFiltersAction = () => {
    setIsVerticalFiltersOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <div className="flex gap-x-0 md:gap-x-4 items-start mx-2">
        <div ref={wrapperRef}>
          <VerticalFilter
            filtersData={selectedFiltersState}
            onFiltersUpdate={onFiltersUpdate}
            onClearFiltersAction={onClearFiltersAction}
            isVerticalFiltersOpen={isVerticalFiltersOpen}
          />
        </div>
        <div className="flex flex-col w-full items-start">
          <div className="flex w-full justify-between px-2 md:px-0">
            {enableFilters && (
              <div className="vertical-filters__toggle-menu block md:hidden">
                <button
                  ref={buttonRef}
                  onClick={toggleVerticalFiltersAction}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Filters
                </button>
              </div>
            )}
            {(true || isSortingFilterVisible) && (
              <Select
                value={sortByFilterValue}
                onChange={onSortingFilterChange}
                options={sortingFilterOptions}
                className="mb-2 w-[180px] text-sm"
              />
            )}
          </div>
          <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full">
            {hotelsResults.data.map((hotel) => (
              <Card key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ResultsContainer.propTypes = {
  hotelsResults: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  enableFilters: PropTypes.bool.isRequired,
  // filtersData: PropTypes.array.isRequired,
  selectedFiltersState: PropTypes.object.isRequired,
  onFiltersUpdate: PropTypes.func.isRequired,
  onClearFiltersAction: PropTypes.func.isRequired,
  sortingFilterOptions: PropTypes.array.isRequired,
  sortByFilterValue: PropTypes.string.isRequired,
  onSortingFilterChange: PropTypes.func.isRequired,
};

export default ResultsContainer;
