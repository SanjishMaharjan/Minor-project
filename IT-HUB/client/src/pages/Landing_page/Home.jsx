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
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        {/* <div class="content">
          <h1>Sliding Diagonals Background Effect</h1>
        </div> */}
        <h1>Exploring the boundless possibilities of technology.</h1>
        <h2>Where imagination meets creativity</h2>
        <img src="../../src/assets/Images/shahadat-rahman-BfrQnKBulYQ-unsplash.jpg" alt="image" />
        <p>
          Want to learn and grow together computer Enthusiast?
          <br />
          Then join us and enroll in our courses
        </p>
      </div>
      <div className="getstarted">
        <Link to="/course/recommend">
          <button type="submit">Get Started</button>
        </Link>
      </div>
      <FAQ />
    </>
  );
};

export default Home;
