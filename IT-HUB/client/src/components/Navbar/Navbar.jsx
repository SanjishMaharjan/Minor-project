import './Navbarstyles.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {

  // To create dark and bright theme
  const [theme, setTheme] = useState("dark-theme");
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    }
    else {
      setTheme("dark-theme");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  return (
    <div>
      <div className="menu-icon">
        <a href="/" className='logo'><img className="logo-image" src="../../src/assets/Images/Itlogo2.png" alt="image" /></a>
        <ul className="navbar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/qa">Q/A</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <img id="theme-icon" onClick={toggleTheme} src={theme === "dark-theme" ? "../../src/assets/images/sun.png" : "../../src/assets/images/moon.png"} alt="dark" />
            {/* <i onClick={toggleTheme} className={theme === "dark-theme" ? "fa-regular fa-brightness-low" : "fa-regular fa-moon"}></i> */}
            {/* <img id="profileImg" src="../../src/assets/images/user.png " alt="profile" srcset="" /> */}
          </li>
          <NavLink to="/login"><button>Log in</button></NavLink>
          {/* To create a hamburger menu using icons pack */}
          <i className="fa fa-bars menu-toggle"></i>
        </ul>
        {/* <div id="mobile">
          <i className="fas fa-times"></i>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
