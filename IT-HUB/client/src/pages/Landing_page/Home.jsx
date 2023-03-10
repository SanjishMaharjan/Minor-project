import React from "react";
import { Link, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import hero from "../../assets/hero.svg";
import CourseObject from "./components/courseObject";
import NewsObject from "./components/NewsObject";
import ChatObject from "./components/ChatObject";
import EventObject from "./components/EventObject";
import { useState } from "react";
import "./home.scss";

import Faq from "./components/Faq";

const works = ["Courses", "News", "Discussion", "Events"];

const Home = () => {
  if (useNavigation().state === "loading") return <Loader />;
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Explore. Innovate.
            <br /> Connect.
          </h1>

          <p>Exploring the boundless possibilities of technology.</p>
          <button>Get started</button>
        </div>
        <div className="hero-image">
          <img src={hero} className="hero-img" alt="hero" />
        </div>
      </div>

      <div className="work-header">
        <h1>Ithub Features</h1>
      </div>

      <div className="works-wrapper">
        <div className="our-works">
          {works.map((work, index) => (
            <p className={active === index ? "active" : ""} onClick={() => setActive(index)}>
              {work}
            </p>
          ))}
        </div>

        <div className="objects">
          {active === 0 && <CourseObject />}
          {active === 1 && <NewsObject />}
          {active === 2 && <ChatObject />}
          {active === 3 && <EventObject />}
        </div>
      </div>
      <Faq />
    </>
  );
};

export default Home;
