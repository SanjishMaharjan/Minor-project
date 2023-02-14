import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Sidebar.css"

const SideBar = () => {
    return (
        <div>
            <div className="main-sidebar">
                <div className="sidebar-icon">
                    <NavLink to="/admin"><h1 style={{ marginTop: "2rem" }}><i class="fa-solid fa-user-gear"></i> DashBoard</h1></NavLink>
                    <ul className="sidebar">
                        <li>
                            <NavLink to="/admin/notification"><i class="fa-solid fa-bell"></i> Notifications</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/manageevents"><i class="fa-solid fa-calendar-days"></i> Manage Events</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/createpoll"><i class="fa-solid fa-square-poll-vertical"></i> Create Poll</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/editcontent"><i class="fa-solid fa-wrench"></i> Update Content</NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout"><i class="fa-solid fa-right-from-bracket"></i> logout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar

