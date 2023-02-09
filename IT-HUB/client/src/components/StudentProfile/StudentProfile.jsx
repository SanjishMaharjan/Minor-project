import React, { useState, useEffect } from 'react';
import profile from "./student-profile.json"
import './StudentStyles.css'


const StudentProfile = () => {

    return (
        < div className='student-wrapper'>
            <h1>Profile</h1>
            {
                profile.map((p) => {
                    return (
                        <div className="student-details">
                            {/* <i class="fa-regular fa-id-badge"></i> */}
                            <img className='profile-pic' src={p.img} />
                            <div className="student-info">
                                <div>Name: {p.name}</div>
                                <div>Role: {p.role}</div>
                                <div>Semester: {p.level}</div>
                                <div>Email: {p.email}</div>
                                <div className="social-handles">
                                    <a href='#'><i className="fa-brands fa-facebook-f"></i></a>
                                    <a href='#'><i className="fa-brands fa-twitter"></i></a>
                                    <a href='#'><i className="fa-brands fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div >
    );
};

export default StudentProfile;