import React from 'react'
import "./HomeStyles.css"
import { NavLink } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <div className='Tagline'>
        <body>
          <h1>Exploring the boundless possibilities of technology.</h1>
          <h2>Where imagination meets creativity</h2>
        </body>
      </div >
      <img className="Landing_image" src="../../src/assets/Images/shahadat-rahman-BfrQnKBulYQ-unsplash.jpg" alt="image" srcset="" />
      <p>Want to learn and grow together computer Enthusiast?<br></br>
        Then join us and enroll in our courses
      </p>
      <div className='getstarted'>
        <NavLink to="/courses"><button className='btn-getstarted' type="submit">Get Started</button></NavLink>
      </div>
    </>

  )
}

export default Home
