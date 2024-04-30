import Checkbox from "../checkbox/Checkbox";
import "./VerticalFilter.css";

import PropTypes from "prop-types";

/**
 * VerticalFilters Component
 * Renders a vertical filter UI for filtering hotel results.
 *
 * @param {Object} props - Props for the component.
 * @param {Array} props.filtersData - An array of filters data objects to display.
 * @param {Function} props.onFiltersUpdate - Callback function to handle filter updates.
 * @param {Function} props.onClearFiltersAction - Callback function to handle clearing of filters.
 * @param {boolean} props.isVerticalFiltersOpen - Flag to control the visibility of the vertical filters.
 */
const VerticalFilter = (props) => {
  const {
    filtersData,
    onFiltersUpdate,
    onClearFiltersAction,
    isVerticalFiltersOpen,
  } = props;

  const isActiveFilterSelected = () => {
    for (const filterGroup of filtersData) {
      for (const subfilter of filterGroup.filters) {
        if (subfilter.isSelected) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div
      className={`hotels-filters__container shadow-lg border w-[240px] z-10 ${
        isVerticalFiltersOpen ? "" : "hidden"
      } absolute top-10 left-2 bg-white md:block md:static md:shadow-none `}
      data-testid="vertical-filters"
    >
      <div className="hotels-filters__header flex justify-between items-center py-2 border-b-2  px-4">
        <h4 className="filter-header text-base font-bold text-slate-600 uppercase">
          Filters
        </h4>
        <button
          className={`clear-button text-sm inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white ${
            isActiveFilterSelected() === true
              ? "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              : "cursor-not-allowed"
          }`}
          onClick={onClearFiltersAction}
        >
          Clear
        </button>
      </div>
      {/* {filData.map((filter) => ( */}
      {filtersData.map((filter) => (
        <div className="border-b-2" key={filter.filterId}>
          <h4 className="text-base font-bold text-slate-600 my-1 px-2">
            {filter.title}
          </h4>
          {filter.filters.map((subfilter) => (
            <Checkbox
              key={subfilter.id}
              id={subfilter.id}
              label={subfilter.title}
              isSelected={subfilter.isSelected}
              filterId={filter.filterId}
              onFiltersUpdate={onFiltersUpdate}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// VerticalFilter.propTypes = {
//   filtersData: PropTypes.array.isRequired,
//   onFiltersUpdate: PropTypes.func.isRequired,
//   onClearFiltersAction: PropTypes.func.isRequired,
//   isVerticalFiltersOpen: PropTypes.bool.isRequired,
// };

export default VerticalFilter;
