import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Tabs.css";

const Tabs = ({ children, isTabsVisible, wrapperRef }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className="flex mt-4 items-start relative"
      style={{
        display: "flex",
        marginTop: "1rem",
        alignItems: "start",
        position: "relative",
      }}
    >
      <div
        className={`profile-container bg-white transition-[max-width] absolute left-4 top-0 shadow-lg md:shadow-sm overflow-hidden md:overflow-visible  md:h-auto md:static ${
          isTabsVisible ? "max-w-[220px]" : "max-w-0 md:max-w-[220px]"
        }`}
        style={{
          maxWidth: isTabsVisible ? "220px" : "0",
          "@media (minWidth: 768px)": {
            maxWidth: isTabsVisible ? "220px" : "0",
          },
        }}
      >
        <div ref={wrapperRef}>
          <ul
            className="flex flex-col border w-[220px]"
            style={{
              display: "flex",
              flexDirection: "column",
              borderWidth: "1px",
              width: "220px",
            }}
          >
            {children.map((child) => {
              const { label, icon } = child.props;
              return (
                <li
                  className={`flex items-center px-2 border-b ${
                    activeTab === label ? "border-blue-500" : ""
                  }`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    borderBottomWidth: "1px",
                    borderBottom:
                      activeTab === label ? "2px solid #2563EB" : "none",
                  }}
                  key={label}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    color={`${activeTab === label ? "#074498" : "#475569"}`}
                  />
                  <button
                    onClick={() => onClickTabItem(label)}
                    className={`text-left w-full p-4 ${
                      activeTab === label ? "text-brand" : "text-slate-600"
                    }`}
                    style={{
                      textAlign: "left",
                      width: "100%",
                      padding: "1rem",
                      color: activeTab === label ? "#2563EB" : "#718096",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className="px-4 w-full"
        style={{ paddingLeft: "1rem", paddingRight: "1rem", width: "100%" }}
      >
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
