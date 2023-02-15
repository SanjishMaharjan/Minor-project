import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./Sidebar.css"
import { GrUserAdmin } from 'react-icons/gr'
import { MdOutlineNotificationsActive, MdOutlineEventNote, MdOutlinePoll, MdOutlineLogout } from 'react-icons/md'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { context } from '../../context/Context'
import { useContext } from 'react'


const SideBar = () => {

    const { isAdmin } = useContext(context);

    return (
        <>
            {!isAdmin &&
                <div className="admin-container">
                    <div className="main-sidebar">
                        <div className="sidebar-icon">
                            <NavLink to="/admin"><h1 style={{ marginTop: "2rem" }}><GrUserAdmin /> DashBoard</h1></NavLink>
                            <ul className="sidebar">
                                <li>
                                    <NavLink to="/admin/notification"><MdOutlineNotificationsActive /> Notifications</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/manageevents"><MdOutlineEventNote /> Manage Events</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/createpoll"><MdOutlinePoll /> Create Poll</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/editcontent"><HiOutlineWrenchScrewdriver /> Update Content</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout"><MdOutlineLogout /> logout</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Outlet className="outlet-component" />
                </div>
            }
        </>
    )
}

export default SideBar

