import React from 'react';
import logo from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
        <img src={logo} alt="logo" />
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        {/* terms and condition and policy  */}
        <div className="footer-terms">
          <ul>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
          </ul>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
