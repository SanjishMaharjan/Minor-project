import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    // const [allEntry, setAllentry] = useState([])

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/forgotpassword', { email });
            const data = await response;
            console.log(data)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

    }, [])



    return (
        <>
            <div className="main-div">
                <div className="box">
                    <h1>Forgot Password</h1>
                    <form action="" onSubmit={submitForm}>
                        <div className='input-box'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder='Email'
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button style={{ border: "0.05rem solid var(--background-color)" }} type="submit">Get Reset Email</button>
                        <div className='forget-navigation'>
                            <NavLink to="/"><i className="fa-solid fa-house"></i></NavLink>
                            <NavLink to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink>
                        </div>
                    </form>

                    {/* <div>
                        {
                            allEntry.map((temp) => {
                                return (
                                    <div>
                                        <p>Email: {temp.email}</p>
                                    </div>
                                )
                            }
                            )

                        }

                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
