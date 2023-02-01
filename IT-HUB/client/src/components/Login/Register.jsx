import React, { useState } from 'react'



const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [DOB, setDOB] = useState('')
    const [allEntry, setAllentry] = useState([])

    const submitForm = (e) => {
        e.preventDefault()
        const newEntry = { email: email, password: password, firstname: firstname, lastname: lastname, DOB: DOB };

        setAllentry([...allEntry, newEntry]);
        console.log(allEntry);
    }

    return (
        <>
            <div className="main_div">
                <div className="box">
                    <h1>Sign Up</h1>
                    <form action="" onSubmit={submitForm}>
                        <div className='input-box'>
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
                        </div>

                        <div className='input-box'>
                            <label htmlFor="firstname">Last Name</label>
                            <input
                                type="text"
                                placeholder='Last name'
                                name="Lastname"
                                id="Lastname"
                                autoComplete="off"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
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
                        <button type="submit">Sign Up</button>
                    </form>

                    <div>
                        {
                            allEntry.map((temp) => {
                                return (
                                    <div>
                                        <p>firstname: {temp.firstname}</p>
                                        <p>lastname: {temp.lastname}</p>
                                        <p>DOB: {temp.DOB}</p>
                                        <p>Email: {temp.email}</p>
                                        <p>Password: {temp.password}</p>
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



export default Register
