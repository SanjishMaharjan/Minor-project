import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './LoginStyles.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [allEntry, setAllentry] = useState([])

  const submitForm = (e) => {
    e.preventDefault()
    const newEntry = { email: email, password: password };

    setAllentry([...allEntry, newEntry]);
    console.log(allEntry);
  }

  return (
    <>
      <div className="main_div">
        <div className="box">
          <h1>Login</h1>
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
            <button type="submit">Login</button>
            <NavLink to="/register"><button className='btn-register' type="submit">Don't have a account? Register here</button></NavLink>
          </form>

          <div>
            {
              allEntry.map((temp) => {
                return (
                  <div>
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

export default Login
