import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const ChangePassword = () => {
    const [oldPassword, setPassword1] = useState('')
    const [newPassword, setPassword2] = useState('')

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:5000/api/users/changepassword', { newPassword, oldPassword });
            const data = response;
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
                    <h1>Reset Password</h1>
                    <form action="" onSubmit={submitForm}>
                        <div className='input-box'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                placeholder='password'
                                name="password"
                                id="password"
                                autoComplete="off"
                                value={oldPassword}
                                onChange={(e) => setPassword1(e.target.value)}
                            />
                        </div>
                        <div className='input-box'>
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type="text"
                                placeholder='password'
                                name="password"
                                id="password"
                                autoComplete="off"
                                value={newPassword}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>

                        <button type="submit">Reset Password</button>
                        <div className='forget-navigation'>
                            <NavLink to="/"><i className="fa-solid fa-house"></i></NavLink>
                            <NavLink to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ChangePassword

