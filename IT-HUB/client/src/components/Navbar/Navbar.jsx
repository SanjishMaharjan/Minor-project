import "./Navbarstyles.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { context } from "../../Context";
import { useContext } from "react";
import ProfileDropDown from "../StudentProfile/ProfileDropDown";



const Navbar = () => {

  const [isLogin, setLogin] = useState(false);

  // To create dark and bright theme and store it in local storage according to preference of user
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark-theme"
  );
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  const Checker = async () => {
    const value = await checkLogin()
    setLogin(value);
    console.log(value);
  }

  useEffect(() => {
    Checker();

  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);



  return (
    <div>
      <div className="menu-icon">
        <a href="/" className="logo">
          <img
            className="logo-image"
            src="../../src/assets/Images/Itlogo2.png"
            alt="image"
          />
        </a>
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
            <NavLink to="/question">Q/A</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>

            <i onClick={toggleTheme} className={theme === "dark-theme" ? "fa-solid fa-toggle-on" : "fa-solid fa-toggle-off"}></i>

          </li>
          <ProfileDropDown />
        </ul>

      </div>
    </div>
  );
};

export default Navbar;
