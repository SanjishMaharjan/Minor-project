import './Navbarstyles.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  // const getlogin = () => {
  //   <a href='/login'>signup</a>
  // }
  return (
    <div>
      <div className="menuIcon">
        <a href="/home" className='Logo'>IT-HUB</a>
        <ul className="navbar">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/qa">Q/A</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        <li>
          <NavLink to="/login"><button>Sign up</button></NavLink>
        </li>
      </div>
    </div>
  )
}

export default Navbar
