import React from 'react'
import members from "./Club_Members.json"
const About = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '3rem', fontSize: "3.4rem" }}>About SOCE</h1>
      <img id="clubLogo" src="../src/assets/images/SOCE_logo.png" alt="" />
      <section className='intro'>
        <p>Society Of Computer Enthusiasts-Lalitpur Engineering College (SOCE-LEC) is an active students’ society for the students of Lalitpur Engineering College established on 2022 AD. As a club, it is started with the intention of working together for exploring new ideas and guiding students for improving their career developing skills. With the enthusiast executive members, the club works on making every student able to cope up with the fast-changing modern computer technology through different practical workshops, events and seminars. It also works on the personal development of the student such as confidence build up, presentation skills enhancement etc. through various programs. The club provides a strong platform for the engineering students to practically implement their innovative ideas in computer for different applications and also offers indispensable guidance, workshops and organizes various events for students to explore their full potential.</p>
      </section>

      <section className="member_info">
        <h1 style={{ textAlign: 'center', marginTop: '3rem', fontSize: "3.4rem" }}> Members</h1>
        <div className='wrapper'>
          {members.map((student) => {
            return (

              <div className="card">
                <div className="card_body">
                  <img className="card_image" src={student.image} alt="" />
                  <h2 className="card_name">{student.name}</h2>
                  <h3 style={{ textAlign: 'center' }}>{student.post}</h3>

                  <div className="socialMedia" style={{ display: "flex", gap: "3rem", marginTop: "2rem", textAlign: "center" }}>
                    <a href={student.facebookId}><i className="fa-brands fa-facebook-f"></i></a>
                    <a href={student.facebookId}><i className="fa-brands fa-twitter"></i></a>
                    <a href={student.facebookId}><i className="fa-brands fa-instagram"></i></a>
                  </div>
                  {/* <p className="card__descript">{props.descript}</p> */}
                </div>
                {/* <a href={item.href}><button className="card_btn" type="button">Read more</button></a> */}
              </div>

            );
          })}

        </div>

      </section>
    </div >
  )
}


export default About
