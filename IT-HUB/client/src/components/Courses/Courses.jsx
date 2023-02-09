import React from 'react'
import { useState, useEffect } from "react";
import course from "./Courses.json"
import "./CoursesStyles.css"

const Courses = () => {

  return (
    <>
      <h1>Courses</h1>
      <div className='wrapper-courses'>
        <button >Previous</button>
        {course.map((learn) => {
          return (

            <div className="course-card">
              <div className="course-body">
                <img className="course-image" src={learn.image} alt="" />
                <h2 className="course-title">{learn.title}</h2>
                {/* <h3 className="card-description">{learn.description}</h3> */}
                {/* <h4 className="card-author">{learn.author}</h4> */}
                {/* <h4 className="card-publishedAt">{learn.publishedAt}</h4> */}
                {/* <h4 className="card-sourcename">{learn.source.name}</h4> */}
              </div>
              <a href={learn.href}><button className="card-btn" type="button">Read more</button></a>
            </div>

          );
        })}
        <button>Next</button>

      </div>
    </>



  )
}

export default Courses
