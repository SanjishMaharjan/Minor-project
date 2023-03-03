import React from "react";
import members from "./Club_Members.json";
import FAQ from "./FAQ/FAQ";
import { useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import "./AboutStyles.scss";

const About = () => {
  if (useNavigation().state === "loading") return <Loader />;

  return (
    <div className="about-container">
      <h1>About SOCE</h1>
      <img src="../src/assets/images/SOCE_logo.png" alt="club-logo" />
      <section>
        <p>
          Society Of Computer Enthusiasts-Lalitpur Engineering College (SOCE-LEC) is an active
          students’ society for the students of Lalitpur Engineering College established on 2022 AD.
          As a club, it is started with the intention of working together for exploring new ideas
          and guiding students for improving their career developing skills. With the enthusiast
          executive members, the club works on making every student able to cope up with the
          fast-changing modern computer technology through different practical workshops, events and
          seminars. It also works on the personal development of the student such as confidence
          build up, presentation skills enhancement etc. through various programs. The club provides
          a strong platform for the engineering students to practically implement their innovative
          ideas in computer for different applications and also offers indispensable guidance,
          workshops and organizes various events for students to explore their full potential.
        </p>
      </section>

      <h1> Members</h1>
      <div className="about-wrapper">
        {members.map((student) => {
          return (
            <div key={student.name}>
              <img src={student.image} alt="" />
              <p>{student.name}</p>
              <p>{student.post}</p>
            </div>
          );
        })}
      </div>
      <FAQ />
    </div>
  );
};

export default About;
