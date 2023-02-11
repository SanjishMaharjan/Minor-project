import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

const Checklogin = () => {

    const [checkstatus, setStatus] = useState([]);
    const checkLogin = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/loggedin");
            const data = await response;
            console.log(typeof data.data);
            setStatus(data.data);
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <div>
            <h1>Are you logged in then ? {String(checkstatus)}</h1>
        </div>
    )
}

export default Checklogin
