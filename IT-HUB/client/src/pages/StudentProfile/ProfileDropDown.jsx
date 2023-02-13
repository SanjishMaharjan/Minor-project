import { Link, NavLink } from "react-router-dom";
import { context } from "../../context/Context";
import { useContext } from "react";
import "./dropdown.css";

import React, { useState, useRef, useEffect } from "react";

const ProfileDropDown = () => {
  const { isLoggedIn, user } = useContext(context);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={ref}>
      {isLoggedIn ? (
        <div onClick={() => setIsOpen(!isOpen)} className="profile-dropdown">
          <i style={{ marginTop: "0.6rem" }} className="fa-solid fa-user"></i>
        </div>
      ) : (
        <NavLink to="/login">
          <button style={{ border: "2px solid var(--hover-color)" }}>Log in</button>
        </NavLink>
      )}
      {isOpen && isLoggedIn && (
        <div className="dropdown">
          <h2> {(user?.name).toUpperCase()}</h2>

          <div className="btn_container">
            <Link to="/profile">
              <i className="fa-solid fa-user"></i> <span>Profile</span>
            </Link>
            <br />
            <Link to="/logout">
              <i class="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
