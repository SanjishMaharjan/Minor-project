import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [allEntry, setAllentry] = useState([])

    const submitForm = (e) => {
        e.preventDefault()
        const newEntry = { email: email };

        setAllentry([...allEntry, newEntry]);
        console.log(allEntry);
    }

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

                        <button type="submit">Get Reset Email</button>
                        <div className='forget-navigation'>
                            <NavLink to="/"><a ><i className="fa-solid fa-house"></i></a></NavLink>
                            <NavLink to="/login"><a><i className="fa-solid fa-arrow-right-to-bracket"></i></a></NavLink>
                        </div>
                    </form>

                    <div>
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

                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
