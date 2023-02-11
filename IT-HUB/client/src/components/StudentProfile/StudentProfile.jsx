import React, { useState, useEffect } from 'react';
// import profile from "./student-profile.json"
import './StudentStyles.css'
import axios from 'axios';
import { convertToYDHMS } from "../../Utils/dateConverter"


const StudentProfile = () => {

    const [profiles, setProfile] = useState([]);
    const getDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/getuser");
            console.log(response);
            console.log(response.data.image.imagePath);
            console.log(response.data.name);
            const date = convertToYDHMS(response.data.DOB);
            response.data.DOB = date;
            setProfile([response.data]);

        } catch (error) {
            console.log(error)
        }

    };
    useEffect(() => {
        getDetails();
    }, [])

    return (
        < div className='student-wrapper'>
            <h1>Profile</h1>
            {

                profiles.map((profile) => {
                    return (
                        <div className="student-details">
                            {/* <i class="fa-regular fa-id-badge"></i> */}
                            <img className='profile-pic' src={profile.image.imagePath} />
                            <div className="student-info">
                                <div>Name: {profile.name}</div>
                                <div>Role: {profile.membership}</div>
                                <div>Semester: {profile.level}</div>
                                {/* <div>DOB:{profile.DOB}</div> */}
                                <div>Age:{profile.DOB}</div>
                                <div>Email: {profile.email}</div>
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


//     return (
//         < div className='student-wrapper'>
//             <h1>Profile</h1>
//             {
//                 profile.map((p) => {
//                     return (
//                         <div className="student-details">
//                             {/* <i class="fa-regular fa-id-badge"></i> */}
//                             <img className='profile-pic' src={p.img} />
//                             <div className="student-info">
//                                 <div>Name: {p.name}</div>
//                                 <div>Role: {p.role}</div>
//                                 <div>Semester: {p.level}</div>
//                                 <div>Email: {p.email}</div>
//                                 <div className="social-handles">
//                                     <a href='#'><i className="fa-brands fa-facebook-f"></i></a>
//                                     <a href='#'><i className="fa-brands fa-twitter"></i></a>
//                                     <a href='#'><i className="fa-brands fa-instagram"></i></a>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })
//             }

//         </div >
//     );
// };

// export default StudentProfile;