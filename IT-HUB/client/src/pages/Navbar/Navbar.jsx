import "./Navbarstyles.css";
import { NavLink } from "react-router-dom";
import ProfileDropDown from "../StudentProfile/ProfileDropDown";
import { MdOutlineLightMode } from "react-icons/md";
import { BiMoon } from "react-icons/bi";
import useToggleTheme from "../../context/ThemeContext";

const Navbar = () => {
  const { toggleTheme, theme } = useToggleTheme();

  return (
    <div className="main-nav">
      <div className="menu-icon">
        <a href="/" className="logo">
          <img className="logo-image" src="../../src/assets/Images/Itlogo2.png" alt="image" />
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
            <NavLink to="/question">Code Café</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
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
    </div>
  );
};

export default Navbar;
