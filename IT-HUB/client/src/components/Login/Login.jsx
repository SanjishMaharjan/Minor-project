import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import './LoginStyles.css'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login',
        { email, password }
      );
      const data = response;
      console.log(data)
      if (data.status == 200) redirect("/")


    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <>
      <div className="main-div">
        <div className="box">
          <h1>Login</h1>
          <form action="" onSubmit={handlelogin}>
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
            {/* to generate error message */}
            {/* <p>{data.response.data.msg}</p> */}
            <NavLink to="/forgotpassword"><a className='btn-register' >Forgot Password?</a></NavLink>
            <NavLink to="/register"><a className='btn-register' >Don't have a account? Register here</a></NavLink>
          </form>


        </div>
      </div>
    </>
  )
}


export default Login
