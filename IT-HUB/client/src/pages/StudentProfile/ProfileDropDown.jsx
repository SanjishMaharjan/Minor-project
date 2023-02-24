import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./dropdown.scss";
import { RiAdminLine } from "react-icons/ri";

import { useState, useRef, useEffect } from "react";

const ProfileDropDown = () => {
  const { isLoggedIn, user, isAdmin } = useAuth();

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

            {isAdmin && (
              <Link to="/admin">
                <RiAdminLine style={{ fontSize: "1.2rem" }} /> <span>Admin</span>
              </Link>
            )}

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
