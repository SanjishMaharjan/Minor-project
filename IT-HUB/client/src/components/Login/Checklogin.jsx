import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

const Checklogin = () => {

    const [checkstatus, setStatus] = useState([]);
    const checkLogin = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/loggedin");
            const data = await response;
            console.log(data);
            setStatus(data);
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <div>

            Maa status
        </div>
    )
}

export default Checklogin
