import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import "./NavBar.css";

import { Link } from "react-router-dom";
import axios from "axios";
import DropdownButton from "./DropdownButton";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  const context = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.post(
      `http://localhost:6969/auth/logout?username=${context.userDetails.username}`
    );
    context.triggerAuthCheck();
    if (res && res.status == 200)
      // navigate("/login");
      window.location.href = "/";
  };

  const dropdownOptions = [
    // { name: "Profile", onClick: () => navigate("/user-profile") },
    {
      name: "Profile",
      onClick: () =>
        (window.location.href = `/user/${context.userDetails.username}`),
    },
    { name: "Logout", onClick: handleLogout },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="logo" />
          </div>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="/" className="navbar-links">
                HOME
              </a>
            </li>
            <li className="navbar-item">
              <a href="/hotels" className="navbar-links">
                HOTELS
              </a>
            </li>
            <li className="navbar-item">
              <a href="/contact" className="navbar-links">
                GALLERY
              </a>
            </li>
            <li className="navbar-item">
              <a href="/about" className="navbar-links">
                ABOUT
              </a>
            </li>
            {/* <li
              className={`navbar-item ${
                !isAuthenticated && "p-4 hover:bg-blue-900 md:hover:bg-brand"
              }`}
            >
              {isAuthenticated ? (
                <DropdownButton triggerType="click" options={dropdownOptions} />
              ) : (
                <Link
                  to="/login"
                  className={`uppercase font-medium text-slate-100 hover-underline-animation `}
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "500",
                    color: "rgba(241,245,249,1)",
                  }}
                >
                  Login/Register
                </Link>
              )}
            </li> */}
            {console.log(isAuthenticated)}
            <li className="navbar-item">
              {isAuthenticated ? (
                // <a href="/logout" className="navbar-links">
                //   LOGOUT
                // </a>
                <DropdownButton triggerType="click" options={dropdownOptions} />
              ) : (
                <a
                  href="/login"
                  className="navbar-links"
                  // style={{
                  //   textTransform: "uppercase",
                  //   fontWeight: "500",
                  //   color: "rgba(241,245,249,1)",
                  // }}
                >
                  LOGIN
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
