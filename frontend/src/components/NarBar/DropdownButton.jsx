import { useState, useRef } from "react";
import useOutsideClickHandler from "../Hooks/useOutsideClickHandler";

const DropdownButton = (props) => {
  const triggerType = props.triggerType || "click";
  const color = props.color || "bg-brand";
  const wrapperRef = useRef();
  const buttonRef = useRef();
  const [isDropdownContainerVisible, setIsDropdownContainerVisible] =
    useState(false);

  const onDropdownClickTrigger = () => {
    triggerType === "click" &&
      setIsDropdownContainerVisible(!isDropdownContainerVisible);
  };

  const onDropdownItemClick = (onClikCallback) => {
    setIsDropdownContainerVisible(false);
    onClikCallback();
  };

  useOutsideClickHandler(wrapperRef, (event) => {
    if (!buttonRef.current.contains(event.target)) {
      setIsDropdownContainerVisible(false);
    }
  });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        id="dropdownDefaultButton"
        onClick={onDropdownClickTrigger}
        className={`dropdown-trigger__button text-white ${color} font-medium p-4 uppercase text-center inline-flex items-center`}
        style={{
          color: "white",
          fontWeight: "500",
          // color: `${color}`,
          // padding: "1rem",
          textTransform: "uppercase",
          textAlign: "center",
          fontSize: "1rem",
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        type="button"
      >
        MY ACCOUNT{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          style={{
            width: "0.625rem",
            height: "0.625rem",
            marginInlineStart: "0.75rem",
          }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        ref={wrapperRef}
        className={`dropdown-trigger__container z-10 ${
          isDropdownContainerVisible ? "visible" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute`}
        style={{
          zIndex: 10,
          visibility: isDropdownContainerVisible ? "visible" : "hidden",
          backgroundColor: "white",
          borderTopWidth: "1px",
          borderBottomWidth: "1px",
          borderTopColor: "gray",
          borderBottomColor: "gray",
          borderTopStyle: "solid",
          borderBottomStyle: "solid",
          borderRadius: "0.375rem",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          width: "8rem",
          position: "absolute",
        }}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          style={{
            paddingBottom: "0.5rem",
            paddingTop: "0.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "rgba(55,65,81,1)",
          }}
          aria-labelledby="dropdownDefaultButton"
        >
          {props.options &&
            props.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    onDropdownItemClick(option.onClick);
                  }}
                  className="w-full block text-left px-4 py-2 hover:bg-brand  dark:hover:text-white"
                  style={{
                    width: "100%",
                    display: "block",
                    textAlign: "left",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    backgroundColor: "transparent",
                    transition: "background-color 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {option.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownButton;
