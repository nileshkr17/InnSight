import React from 'react'
import logo from '../../assets/logo.png'
import './NavBar.css'

const NavBar = () => {
  return (
    <>
   
    <nav className="navbar">
  <div className="navbar-container">
    <div className="navbar-logo">
        <img src={logo} alt="logo" />
    </div>
    <ul className="navbar-menu">
      <li className="navbar-item">
        <a href="/" className="navbar-links">HOME</a>
      </li>
      <li className="navbar-item">
        <a href="/hotels" className="navbar-links">HOTELS</a>
      </li>
      <li className="navbar-item">
        <a href="/contact" className="navbar-links">GALLERY</a>
      </li>
      <li className="navbar-item">
        <a href="/about" className="navbar-links">ABOUT</a>
      </li>
      <li className="navbar-item">
        {/* user avatar */}
        <a href="/logout" className="navbar-links">LOGIN</a>
      </li>

    </ul>
  </div>
</nav>

    </>
  )
}

export default NavBar