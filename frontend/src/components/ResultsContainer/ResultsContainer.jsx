import { useRef, useState } from "react";
import useOutsideClickHandler from "../Hooks/useOutsideClickHandler";
import VerticalFilter from "../VerticalFilter/VerticalFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import Card from "../HotelCard/Card";
import PropTypes from "prop-types";
import FilterBar from "../FilterBar/FIlterBar";
import "./ResultsContainer.css";

/* eslint-disable no-unused-vars */
const ResultsContainer = (props) => {
  const {
    hotelsResults,
    enableFilters,
    filtersData,
    selectedFiltersState,
    onFiltersUpdate,
    onClearFiltersAction,
    sortingFilterOptions,
    sortByFilterValue,
    onSortingFilterChange,
  } = props;

  const [hotelResultsFilter, setHotelResultsFilter] = useState(
    hotelsResults.data
  );

  const isSortingFilterVisible =
    sortingFilterOptions && sortingFilterOptions.length > 0;

  const [isVerticalFiltersOpen, setIsVerticalFiltersOpen] = useState(false);

  const wrapperRef = useRef();
  const buttonRef = useRef();

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsVerticalFiltersOpen(false);
    }
  });

  const toggleVerticalFiltersAction = () => {
    // Toggle based on the current state
    setIsVerticalFiltersOpen((prevState) => !prevState);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className="inner-container flex gap-x-0 md:gap-x-4 items-start mx-2"
        // style={{
        //   display: "flex",
        //   gap: "0",
        //   alignItems: "start",
        //   marginX: "2px",
        //   "@media (min-width: 768px)": { gap: "4px" },
        // }}
      >
        {/* {enableFilters && selectedFiltersState.length > 0 && ( */}
        <div
          style={{
            width: "286px",
          }}
          ref={wrapperRef}
        >
          {/* <div> */}
          <VerticalFilter
            // filtersData={selectedFiltersState}
            filtersData={filtersData.data}
            onFiltersUpdate={onFiltersUpdate}
            onClearFiltersAction={onClearFiltersAction}
            isVerticalFiltersOpen={isVerticalFiltersOpen}
          />
          {/* <FilterBar
            hotels={hotelResultsFilter}
            setFilteredHotels={setHotelResultsFilter}
          /> */}
        </div>
        {/* {enableFilters && filtersData.isLoading && <VerticalFiltersSkeleton />} */}
        <div className="result-container flex flex-col w-full items-start">
          <div
            className="sort-container flex w-full justify-between px-2 md:px-0"
            // style={{
            //   display: "flex",
            //   width: "100%",
            //   justifyContent: "space-between",
            //   paddingLeft: "0.5rem",
            //   paddingRight: "0.5rem",
            //   "@media (min-width: 768px)": {
            //     paddingLeft: "0",
            //     paddingRight: "0",
            //   },
            // }}
          >
            {/* {enableFilters && (
              <div className="vertical-filters__toggle-menu block md:hidden">
                <button
                  ref={buttonRef}
                  data-testid="vertical-filters__toggle-menu"
                  onClick={toggleVerticalFiltersAction}
                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faFilter} size="sm" className="mr-1" />{" "}
                  Filters
                </button>
              </div>
            )} */}
            {isSortingFilterVisible && (
              <Select
                value={sortByFilterValue}
                onChange={onSortingFilterChange}
                options={sortingFilterOptions}
                className="select mb-2 w-[180px] text-sm"
              />
            )}
          </div>
          <div className="hotels-results__container mx-2 md:mx-0 flex flex-col gap-y-2 w-full">
            {/* {hotelsResults.isLoading ? (
              Array.from({ length: 5 }, (_, index) => (
                <HotelViewCardSkeleton key={index} />
              ))
            ) : hotelsResults.data.length > 0 ? (
              hotelsResults.data.map((hotel) => (
                <HotelViewCard
                  key={hotel.hotelCode}
                  id={hotel.hotelCode}
                  title={hotel.title}
                  image={hotel.images[0]}
                  subtitle={hotel.subtitle}
                  benefits={hotel.benefits}
                  ratings={hotel.ratings}
                  price={hotel.price}
                />
              ))
            ) : (
              <EmptyHotelsState />
            )} */}
            {/* {hotelsResults.data.length > 0 ? ( */}
            {/* {hotelsResults.data.map((hotel) => (
              <HotelViewCard
                key={hotel.hotelCode}
                id={hotel.hotelCode}
                title={hotel.title}
                image={hotel.images[0]}
                subtitle={hotel.subtitle}
                benefits={hotel.benefits}
                ratings={hotel.ratings}
                price={hotel.price}
              />
            ))} */}
            {hotelsResults.data.map((hotel) => (
              <Card
                key={hotel.hotelId}
                // id={hotel.hotelId}
                hotel={hotel}
              />
            ))}
            {/* // ) : (
            //   <></>
            // )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

// ResultsContainer.propTypes = {
//   hotelsResults: PropTypes.shape({
//     data: PropTypes.arrayOf(PropTypes.object).isRequired,
//     isLoading: PropTypes.bool.isRequired,
//     errors: PropTypes.array,
//     metadata: PropTypes.object,
//     pagination: PropTypes.object,
//   }).isRequired,
//   enableFilters: PropTypes.bool.isRequired,
//   filtersData: PropTypes.array.isRequired,
//   onFiltersUpdate: PropTypes.func.isRequired,
//   onClearFiltersAction: PropTypes.func.isRequired,
//   selectedFiltersState: PropTypes.object.isRequired,
//   sortByFilterValue: PropTypes.string.isRequired,
//   onSortingFilterChange: PropTypes.func.isRequired,
//   sortingFilterOptions: PropTypes.array.isRequired,
// };

export default ResultsContainer;
