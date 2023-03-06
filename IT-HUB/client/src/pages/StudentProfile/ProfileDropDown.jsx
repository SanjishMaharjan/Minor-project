import { Link, NavLink } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { RiAdminLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoPrimitiveDot } from "react-icons/go";
import "./dropdown.scss";

import { useState, useRef, useEffect } from "react";

const ProfileDropDown = ({ count }) => {
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
          {/* <i style={{ marginTop: "0.6rem" }} className="fa-solid fa-user"></i> */}
          <FaUserAlt />
          <span className="active-number">
            {count > 0 ? <GoPrimitiveDot className="active-dot" /> : null}
          </span>
        </div>
      ) : (
        <NavLink to="/login">
          <button style={{ border: "2px solid var(--hover-color)" }}>Log in</button>
        </NavLink>
      )}
      {isOpen && isLoggedIn && (
        <div className="dropdown">
          <h2>{user?.name ? user.name.split(" ")[0] : ""}</h2>
          <div>
            <Link to="/profile">
              <CgProfile /> <span>Profile</span>
            </Link>

            <Link to="/notification">
              <MdOutlineNotificationsActive />{" "}
              <span className="active-number">
                Notifs
                {count > 0 ? count : null}
              </span>
            </Link>

            {isAdmin && (
              <Link to="/admin">
                <RiAdminLine /> <span>Admin</span>
              </Link>
            )}

            <Link to="/logout">
              <MdOutlineLogout /> <span>Logout</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
