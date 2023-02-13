import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'



const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    // const [firstname, setFirstname] = useState('')
    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const [DOB, setDOB] = useState('')
    const redirect = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { email, password, name, DOB, level });
            const data = await response;
            if (data.status == 200) redirect("/")

            // const newEntry = { email: email, password: password, name: name, DOB: DOB };
            console.log(data)
        }
        catch (e) {
            console.log(e);
        }
    }



    return (
        <>
            <div className="main_div">
                <div className="box">
                    <h1>Sign Up</h1>
                    <form action="" onSubmit={handleSubmit}>
                        {/* <div className='input-box'>
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                placeholder='First name'
                                name="Firstname"
                                id="Firstname"
                                autoComplete="off"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div> */}

                        <div className='input-box'>
                            <label htmlFor="firstname">Name</label>
                            <input
                                type="text"
                                placeholder='Name'
                                name="name"
                                id="name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='input-box'>
                            <label htmlFor="DOB">Date of Birth</label>
                            <input
                                type="date"
                                placeholder='DOB'
                                name="DOB"
                                id="DOB"
                                autoComplete="off"
                                value={DOB}
                                onChange={(e) => setDOB(e.target.value)}
                            />
                        </div>

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

                        <div className='input-box'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder='password'
                                id="password"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='input-box'>
                            <label htmlFor="Confirm password">Retype Password</label>
                            <input
                                type="password"
                                placeholder='Confirm password'
                                id="password2"
                                autoComplete="off"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>

                        <div className='input-box'>
                            <label htmlFor="Confirm password">Level</label>
                            <input
                                type="name"
                                placeholder='level'
                                id="level"
                                autoComplete="off"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>

                    {/* <div>
                        {
                            allEntry.map((temp) => {
                                return (
                                    <div>
                                        <p>firstname: {temp.firstname}</p>
                                        <p>lastname: {temp.lastname}</p>
                                        <p>DOB: {temp.DOB}</p>
                                        <p>Email: {temp.email}</p>
                                        <p>Password: {temp.password}</p>
                                        <p>Password2: {temp.password2}</p>
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



export default Register
