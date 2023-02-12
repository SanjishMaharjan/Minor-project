import React from 'react'
import { useState, useEffect } from "react";
import course from "./Courses.json"
import "./CoursesStyles.css"

const Courses = () => {

  return (
    <>
      <div className="course-header">
        <h1 style={{ textAlign: "center" }}>Courses</h1>
        <div className='question-bar'>
          <i style={{ marginRight: "1rem", fontSize: "2rem" }} class="fa-solid fa-magnifying-glass"></i>
          <form>
            <input className='post-question' type="text" placeholder='Browse Courses' />
            <button style={{ marginLeft: "1rem" }} type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className='course-container'>
        <div className='container-content'>
          <div className="category">
            <button >Recommended</button>
            <button >ALL</button>
          </div>
          {course.map((learn) => {
            return (

              <div className="course-card">
                <div className="course-content">
                  <img className="course-image" src={learn.image} alt="" />
                  <h2 className="course-title">{learn.title}</h2>
                  {/* <h3 className="card-description">{learn.description}</h3> */}
                  {/* <h4 className="card-author">{learn.author}</h4> */}
                  {/* <h4 className="card-publishedAt">{learn.publishedAt}</h4> */}
                  {/* <h4 className="card-sourcename">{learn.source.name}</h4> */}
                </div>
                <div className="course-tag" style={{ marginLeft: "2rem", display: "flex", justifyContent: "left", gap: "2rem" }}>
                  <h3>4 {"     "}<i className="fa-solid fa-star"></i></h3>
                  <button >{learn.tags}</button>
                </div>
                <a href={learn.href}><button className="card-btn" type="button">Read more</button></a>
              </div>

            );
          })}
          <button>Next</button>

        </div>
      </div>
    </>



  )
}

export default Courses
