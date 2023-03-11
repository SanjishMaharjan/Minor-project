import React from "react";
import Gallery from "../Gallery/Gallery";
import "./events.scss";

const Events = () => {
  return (
    <div class="events-wrapper">
      <div class="upcomming-events">
        <h1>Upcomming Events</h1>
        <div class="upcomming-event">
          <p>2080-01-01</p>
          <h2>Format Document in Word</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati dolores laborum modi
            explicabo aut in doloribus, illum a. Repudiandae, nulla.
          </p>
        </div>
        <div class="upcomming-event">
          <p>2080-02-01</p>
          <h2>Website Hosting</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo aliquam expedita nisi
            fugiat molestias alias!
          </p>
        </div>
        <div class="upcomming-event">
          <p>2080-02-01</p>
          <h2>Django Workshop</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum eius, sunt quisquam
            deleniti fugiat eos.
          </p>
        </div>
        <div class="upcomming-event">
          <p>2080-02-01</p>
          <h2>Django Workshop</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, hic aperiam! Repellendus
            eius ab praesentium.
          </p>
        </div>
      </div>
      <div class="past-events">
        <h1>Past events</h1>
        <div class="past-events-container">
          <div class="past-event">
            <img src="/event.png" width="550" height="300" alt="" />
            <p>2080-01-01</p>
            <h2>Format Document in Word</h2>
            <p>Tell How To Boost Website Traffic</p>
          </div>
          <div class="past-event">
            <img src="/event2.png" width="550" height="300" alt="" />
            <p>2080-02-01</p>
            <h2>Website Hosting</h2>
            <p>Tell H Website Traffic</p>
          </div>
          <div class="past-event">
            <img src="/event3.png" width="550" height="300" alt="" />
            <p>2080-02-01</p>
            <h2>Django Workshop</h2>
            <p>Tell H Website Traffic</p>
          </div>
          <div class="past-event">
            <img src="/event4.png" width="550" height="300" alt="" />
            <p>2080-02-01</p>
            <h2>Django Workshop</h2>
            <p>Tell H Website Traffic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
