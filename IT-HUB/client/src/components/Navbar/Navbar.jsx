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




  // let icon = document.getElementById("themeIcon");

  // icon.onclick = function () {
  //   toggleTheme();
  // }

  return (
    <div>
      <div className="menuIcon">
        <a href="/home" className='Logo'>IT-HUB</a>
        <ul className="navbar">
          <li>
            <NavLink to="/home">Home</NavLink>
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
            <img id="themeIcon" onClick={toggleTheme} src={theme === "dark-theme" ? "../../src/assets/images/sun.png" : "../../src/assets/images/moon.png"} alt="dark" />
            {/* <img id="profileImg" src="../../src/assets/images/user.png " alt="profile" srcset="" /> */}
          </li>
          <NavLink to="/login"><button>Log in</button></NavLink>
        </ul>
        {/* To create a hamburger menu using icons pack */}
        {/* <div id="mobile">
          <i className="fas fa-bars"></i>
          <i className="fas fa-times"></i>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
