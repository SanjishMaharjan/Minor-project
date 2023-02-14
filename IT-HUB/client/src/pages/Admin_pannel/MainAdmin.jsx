import React from 'react'
import SideBar from './SideBar'
import { RiAdminFill } from 'react-icons/ri'


const MainAdmin = () => {
    return (
        <div className='main-container'>
            <div className="adminContainer">
                <h1><RiAdminFill style={{ fontSize: "7rem" }} /><br />
                    Welcome, Admin</h1>
            </div>
        </div >
    )
}

export default MainAdmin
