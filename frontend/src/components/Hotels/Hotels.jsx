/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
// import GlobalSearchBox from "components/global-search-box/GlobalSearchbox";
// import ResultsContainer from "components/results-container/ResultsContainer";
// import { networkAdapter } from "services/NetworkAdapter";

import { useLocation, useSearchParams } from "react-router-dom";
import { parse } from "date-fns";
// import PaginationController from "components/ux/pagination-controller/PaginationController";
// import { SORTING_FILTER_LABELS } from "utils/constants";
import _debounce from "lodash/debounce";
import { formatDate } from "../utils/date-helpers";
import isEmpty from "../utils/helpers";
import { MAX_GUESTS_INPUT_VALUE } from "../utils/constants";
import ResultsContainer from "../ResultsContainer/ResultsContainer";
import axios from "axios";
import Card from "../HotelCard/Card";
import GlobalSearch from "../SearchBar/GlobalSearch";
import GlobalSearchBar from "../SearchBar/GLobalSearchBar";

/**
 * Represents the hotels search component.
 * @component
 * @returns {JSX.Element} The hotels search component.
 */
const HotelsSearch = () => {
  // State for managing date picker visibility
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  // State for managing location input value
  const [locationInputValue, setLocationInputValue] = useState("pune");

  // State for managing number of guests input value
  const [numGuestsInputValue, setNumGuestsInputValue] = useState("");

  // State for storing available cities
  const [availableCities, setAvailableCities] = useState([]);

  // State for managing current results page
  const [currentResultsPage, setCurrentResultsPage] = useState(1);

  // State for managing filters data
  const [filtersData, setFiltersData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  // State for storing hotels search results
  const [hotelsResults, setHotelsResults] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  // State for managing sorting filter value
  const [sortByFilterValue, setSortByFilterValue] = useState({
    value: "default",
    label: "Sort by",
  });

  // State for managing selected filters
  const [selectedFiltersState, setSelectedFiltersState] = useState({});

  const [filteredTypeheadResults, setFilteredTypeheadResults] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(_debounce(queryResults, 1000), []);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  // Options for sorting filter
  const sortingFilterOptions = [
    { value: "default", label: "Sort by" },
    { value: "priceLowToHigh", label: "Price : Low to High" },
    { value: "priceHighToLow", label: "Price : High to Low" },
  ];

  /**
   * Handles updates to sorting filter.
   * @param {Object} selectedOption - The selected option.
   */
  const onSortingFilterChange = (selectedOption) => {
    setSortByFilterValue(selectedOption);
  };

  /**
   * Handles updates to filters.
   * @param {Object} updatedFilter - The filter object that is updated.
   */
  const onFiltersUpdate = (updatedFilter) => {
    setSelectedFiltersState(
      selectedFiltersState.map((filterGroup) => {
        if (filterGroup.filterId === updatedFilter.filterId) {
          return {
            ...filterGroup,
            filters: filterGroup.filters.map((filter) => {
              if (filter.id === updatedFilter.id) {
                return {
                  ...filter,
                  isSelected: !filter.isSelected,
                };
              }
              return filter;
            }),
          };
        }
        return filterGroup;
      })
    );
  };

  const onDateChangeHandler = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const onSearchButtonAction = () => {
    const activeFilters = getActiveFilters();
    const numGuest = Number(numGuestsInputValue);
    const checkInDate = formatDate(dateRange.startDate) ?? "";
    const checkOutDate = formatDate(dateRange.endDate) ?? "";
    setSearchParams({
      city: locationInputValue,
      numGuests: numGuestsInputValue,
    });

    // Construct filters object to be passed to fetchHotels
    const filters = {
      city: locationInputValue,
      ...activeFilters,
      guests: numGuest,
      checkInDate,
      checkOutDate,
    };

    // Pass filters object to fetchHotels along with other parameters
    // fetchHotels(filters, currentResultsPage, sortByFilterValue);
  };

  const getActiveFilters = () => {
    const filters = {};
    selectedFiltersState.forEach((category) => {
      const selectedValues = category.filters
        .filter((filter) => filter.isSelected)
        .map((filter) => filter.value);

      if (selectedValues.length > 0) {
        filters[category.filterId] = selectedValues;
      }
    });
    if (!isEmpty(filters)) {
      return filters;
    }
    return null;
  };

  // Toggles the visibility of the date picker
  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  /**
   * Handles changes in the location input.
   * Refreshes hotel data if the location is valid.
   * @param {string} value - The new location value.
   */
  const onLocationChangeInput = async (newValue) => {
    setLocationInputValue(newValue);
    // Debounce the queryResults function to avoid making too many requests
    debounceFn(newValue, availableCities);
  };

  /**
   * Queries the available cities based on the user's input.
   * @param {string} query - The user's input.
   * @returns {void}
   *
   */
  function queryResults(query, availableCities) {
    const filteredResults = availableCities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFilteredTypeheadResults(filteredResults);
  }

  /**
   * Handles changes in the number of guests input.
   * @param {String} numGuests - Number of guests.
   */
  const onNumGuestsInputChange = (numGuests) => {
    if (numGuests < MAX_GUESTS_INPUT_VALUE && numGuests > 0) {
      setNumGuestsInputValue(numGuests);
    }
  };

  const onClearFiltersAction = () => {
    const hasActiveFilters = selectedFiltersState.some((filterGroup) =>
      filterGroup.filters.some((filter) => filter.isSelected)
    );

    if (hasActiveFilters) {
      setSelectedFiltersState(
        selectedFiltersState.map((filterGroup) => ({
          ...filterGroup,
          filters: filterGroup.filters.map((filter) => ({
            ...filter,
            isSelected: false,
          })),
        }))
      );
    }
  };

  /**
   * Fetches hotels based on the provided filters.
   * @param {Object} filters - The filters to apply.
   * @returns {Promise<void>}
   * @async
   */
  

  useEffect(() => {
    async function fetchHotels() {
      try {
        const hotelsResultsResponse = await axios.get(
          "http://127.0.0.1:6969/hotel/hotels"
        );

        if (hotelsResultsResponse && hotelsResultsResponse.data) {
          const hotelsData = hotelsResultsResponse.data.map((hotel) => ({
            hotelId: hotel.hotelId,
            hotelName: hotel.hotelName,
            hotelBanner: hotel.hotelBanner,
            location: hotel.location,
            amenities: hotel.amenities,
            rating: hotel.rating,
            pricePerNight: hotel.pricePerNight,
          }));

          setHotelsResults({
            isLoading: false,
            data: hotelsData,
            errors: null,
            metadata: null, // Adjust according to your API response
            pagination: null, // Adjust according to your API response
          });
        } else {
          setHotelsResults({
            isLoading: false,
            data: [],
            errors: "No data available",
            metadata: null, // Adjust according to your API response
            pagination: null, // Adjust according to your API response
          });
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotelsResults({
          isLoading: false,
          data: [],
          errors: "Error fetching hotels",
          metadata: null, // Adjust according to your API response
          pagination: null, // Adjust according to your API response
        });
      }
    }

    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFiltersData({
          isLoading: false,
          data: [
            {
              filterId: "star_ratings",
              title: "Star ratings",
              filters: [
                {
                  id: "5_star_rating",
                  title: "5 Star",
                  value: "5",
                },
                {
                  id: "4_star_rating",
                  title: "4 Star",
                  value: "4",
                },
                {
                  id: "3_star_rating",
                  title: "3 Star",
                  value: "3",
                },
              ],
            },
            {
              filterId: "property_type",
              title: "Property type",
              filters: [
                {
                  id: "prop_type_hotel",
                  title: "Hotel",
                },
                {
                  id: "prop_type_apartment",
                  title: "Apartment",
                },
                {
                  id: "prop_type_villa",
                  title: "Villa",
                },
              ],
            },
          ],
          errors: [],
        });
      } catch (error) {
        setFiltersData({
          isLoading: false,
          data: [],
          errors: [`Error: ${error.message}`],
        });
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  useEffect(() => {
    setSelectedFiltersState(
      filtersData.data.map((filterGroup) => ({
        ...filterGroup,
        filters: filterGroup.filters.map((filter) => ({
          ...filter,
          isSelected: false,
        })),
      }))
    );
  }, [filtersData]);

  const handlePageChange = (page) => {
    setCurrentResultsPage(page);
  };

  const handlePreviousPageChange = () => {
    setCurrentResultsPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };

  const handleNextPageChange = () => {
    setCurrentResultsPage((prev) => {
      if (prev >= hotelsResults.pagination.totalPages) return prev;
      return prev + 1;
    });
  };

  // Fetches the list of available cities
  // const fetchAvailableCities = async () => {
  //   const availableCitiesResponse = await axios.get("/api/availableCities");
  //   if (availableCitiesResponse) {
  //     setAvailableCities(availableCitiesResponse.data.elements);
  //   }
  // };
  const fetchAvailableCities = async () => {
    try {
      const availableCitiesResponse = await axios.get(
        "http://127.0.0.1:6969/hotel/availableCities"
      ); // Update the URL to match your route
      if (availableCitiesResponse && availableCitiesResponse.status === 200) {
        // If the response is successful (status code 200), set the available cities
        setAvailableCities(availableCitiesResponse.data.data.elements); // Access 'elements' property of the response data
      } else {
        // If the response status is not 200, handle the error
        console.error("Error: Unable to fetch available cities data");
      }
    } catch (error) {
      // If an error occurs during the request, handle it
      console.error(`Error: ${error.message}`);
    }
  };

  // Fetch available cities and initial data on component mount
  useEffect(() => {
    fetchAvailableCities();
    // getVerticalFiltersData();
  }, []);

  // And update location input value if city is present in the URL
  // Also update number of guests input value if numGuests is present in the URL
  useEffect(() => {
    if (searchParams.get("city")) {
      setLocationInputValue(searchParams.get("city"));
    }

    if (searchParams.get("numGuests")) {
      setNumGuestsInputValue(searchParams.get("numGuests"));
    }
  }, [searchParams]);

  // Update selected filters state when filters data changes
  // useEffect(() => {
  //   setSelectedFiltersState(
  //     filtersData.data.map((filterGroup) => ({
  //       ...filterGroup,
  //       filters: filterGroup.filters.map((filter) => ({
  //         ...filter,
  //         isSelected: false,
  //       })),
  //     }))
  //   );
  // }, [filtersData]);

  useEffect(() => {
    if (selectedFiltersState.length > 0) {
      const activeFilters = getActiveFilters();
      if (activeFilters) {
        activeFilters.city = locationInputValue.toLowerCase();
        // fetchHotels(activeFilters);
      } else {
        // fetchHotels({
        //   city: locationInputValue,
        // });
      }
    }
  }, [
    selectedFiltersState,
    currentResultsPage,
    sortByFilterValue,
    getActiveFilters,
    locationInputValue,
  ]);

  // Fetch hotels when location input value changes
  useEffect(() => {
    if (location.state) {
      const { city, numGuest, checkInDate, checkOutDate } = location.state;
      if (numGuest) {
        setNumGuestsInputValue(numGuest.toString());
      }
      setLocationInputValue(city);
      if (checkInDate && checkOutDate) {
        setDateRange([
          {
            startDate: parse(checkInDate, "dd/MM/yyyy", new Date()),
            endDate: parse(checkOutDate, "dd/MM/yyyy", new Date()),
            key: "selection",
          },
        ]);
      }
    }
  }, [location]);

  return (
    <div className="hotels">
      <div className="search-container bg-brand px-2 lg:h-[120px] h-[220px] flex items-center justify-center">
        <GlobalSearchBar
          locationInputValue={locationInputValue}
          locationTypeheadResults={filteredTypeheadResults}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          setisDatePickerVisible={setisDatePickerVisible}
          onLocationChangeInput={onLocationChangeInput}
          onNumGuestsInputChange={onNumGuestsInputChange}
          dateRange={dateRange}
          onDateChangeHandler={onDateChangeHandler}
          onDatePickerIconClick={onDatePickerIconClick}
          onSearchButtonAction={onSearchButtonAction}
        />
      </div>
      <div className="my-4"></div>
      <div className="w-[180px]"></div>
      <ResultsContainer
        hotelsResults={hotelsResults}
        enableFilters={true}
        filtersData={filtersData}
        onFiltersUpdate={onFiltersUpdate}
        onClearFiltersAction={onClearFiltersAction}
        selectedFiltersState={selectedFiltersState}
        sortByFilterValue={sortByFilterValue}
        onSortingFilterChange={onSortingFilterChange}
        sortingFilterOptions={sortingFilterOptions}
      />

    </div>
  );
};

export default HotelsSearch;
