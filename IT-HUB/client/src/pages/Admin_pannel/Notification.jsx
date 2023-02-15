import React from 'react'
import { MdOutlineNotificationsActive } from 'react-icons/md'


const Notification = () => {
    return (
        <div className="main-container">
            <h1><MdOutlineNotificationsActive style={{ fontSize: "7rem" }} /><br />
                Here are all your Notifications</h1>
        </div>
    )
}

export default Notification
