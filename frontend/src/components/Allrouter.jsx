import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Hotels from "./Hotels/Hotels";
import AboutUs from "./AboutUs/AboutUs";
import Login from "./Login/Login";
import Register from "./Register/Register";
import VerifyEmailPage from "./VerifyEmail/VerifyEmail";
import UserProfile from "./UserProfile/UserProfile";
import Logout from "./Logout/Logout";

const Allrouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/hotels" element={<Hotels />} /> */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  );
};

export default Allrouter;
