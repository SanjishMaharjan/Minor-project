import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Sidebar.scss";
import { RiUserSettingsLine } from "react-icons/ri";
import {
  MdOutlineNotificationsActive,
  MdOutlineEventNote,
  MdOutlinePoll,
  MdOutlineLogout,
} from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import useAuth from "../../context/AuthContext";

const SideBar = () => {
  // const { isAdmin } = useAuth();

  return (
    <>
      <div className="admin-container">
        <div className="main-sidebar">
          <div className="sidebar-icon">
            <NavLink to="/admin">
              <h1 style={{ marginTop: "2rem" }}>
                <RiUserSettingsLine /> DashBoard
              </h1>
            </NavLink>
            <ul className="sidebar">
              <li>
                <NavLink to="/admin/adminnotification">
                  <MdOutlineNotificationsActive /> Notifications
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/addEvent">
                  <MdOutlineEventNote /> Add Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/editEvent">
                  <HiOutlineWrenchScrewdriver /> Update Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout">
                  <MdOutlineLogout /> logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Outlet className="outlet-component" />
      </div>
    </>
  );
};

export default SideBar;
