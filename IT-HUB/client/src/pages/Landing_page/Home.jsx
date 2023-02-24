import React from "react";
import { Link, useNavigation } from "react-router-dom";
import FAQ from "../About/FAQ/FAQ";
import Loader from "../../components/Loader";
import "./HomeStyles.scss";

const Home = () => {
  if (useNavigation().state === "loading") return <Loader />;
  return (
    <>
      <div className="Tagline">
        <h1>Exploring the boundless possibilities of technology.</h1>
        <h2>Where imagination meets creativity</h2>
      </div>
      <img
        className="Landing-image"
        src="../../src/assets/Images/shahadat-rahman-BfrQnKBulYQ-unsplash.jpg"
        alt="image"
      />
      <p>
        Want to learn and grow together computer Enthusiast?<br></br>
        Then join us and enroll in our courses
      </p>
      <div className="getstarted">
        <Link to="/courses">
          <button className="btn-getstarted" type="submit">
            Get Started
          </button>
        </Link>
      </div>
      <FAQ />
    </>
  );
};

export default Home;
