// VerticalFilter.jsx
import PropTypes from "prop-types";
import Checkbox from "../checkbox/Checkbox";

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
        <h4 className="text-base font-bold text-slate-600 uppercase">
          Filters
        </h4>
        <button
          className={`text-sm inline-flex items-center px-2.5 py-1.5 border border-gray-300 font-medium rounded text-gray-700 bg-white ${
            isActiveFilterSelected() === true
              ? "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              : "cursor-not-allowed"
          }`}
          onClick={onClearFiltersAction}
        >
          Clear
        </button>
      </div>
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

VerticalFilter.propTypes = {
  filtersData: PropTypes.array.isRequired,
  onFiltersUpdate: PropTypes.func.isRequired,
  onClearFiltersAction: PropTypes.func.isRequired,
  isVerticalFiltersOpen: PropTypes.bool.isRequired,
};

export default VerticalFilter;
