import "./Navbarstyles.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileDropDown from "../StudentProfile/ProfileDropDown";
import { MdOutlineLightMode } from "react-icons/md";
import { BiMoon } from "react-icons/bi";
import useToggleTheme from "../../context/ThemeContext";

const Navbar = () => {
  const { toggleTheme, theme } = useToggleTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-icon">
      <a href="/" className="logo">
        <img className="logo-image" src="../../src/assets/Images/Itlogo2.png" alt="image" />
      </a>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
          <span></span>
        </div>
      </div>
      <ul className={`navbar ${isMenuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" onClick={toggleMenu}>
            Crunchy Bytes
          </NavLink>
        </li>
        <li>
          <NavLink to="/course" onClick={toggleMenu}>
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/question/page/1" onClick={toggleMenu}>
            Code Café
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" onClick={toggleMenu}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={toggleMenu}>
            About
          </NavLink>
        </li>
        <li>
          {theme === "dark-theme" ? (
            <MdOutlineLightMode className="icon sun" onClick={toggleTheme} />
          ) : (
            <BiMoon className="icon " onClick={toggleTheme} />
          )}
        </li>
        <ProfileDropDown />
      </ul>
    </div>
  );
};

export default Navbar;
