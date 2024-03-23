import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';

const Allrouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<Hotels />} /> */}
          {/* <Route path="/contact" element={<About />} /> */}
          {/* <Route path="/contact" element={<UserLogin />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default Allrouter;
