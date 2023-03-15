import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import "./events.scss";

const Events = () => {
  const { data: events } = useQuery(["events"], {
    enabled: false,
  });

  const { expiredEvents, upCommingEvents } = events;

  return (
    <div class="events-wrapper">
      <div class="upcomming-events">
        <h1>Upcomming Events</h1>
        {upCommingEvents?.map((event) => (
          <Link to={`/events/upcomming/${event?._id}`}>
            <div class="upcomming-event" key={event?._id}>
              <p>{event.startDate.substring(0, 10)} </p>
              <h2>{event.title}</h2>
              <p>{event.description.substring(0, 100) + "..."}</p>
            </div>
          </Link>
        ))}
      </div>
      <div class="past-events">
        <h1>Past events</h1>
        <div class="past-events-container">
          {expiredEvents?.map((event) => (
            <div class="past-event" key={event?._id}>
              <Link to={`/events/past/${event?._id}`}>
                <img src={event?.gallery[0]?.imagePath} width="550" height="300" alt="" />
              </Link>
              <p>
                {event.startDate.substring(0, 10)} - {event.endDate.substring(0, 10)}
              </p>
              <p>{event.location}</p>
              <h2>{event.title}</h2>
              <p>{event.description.substring(0, 100) + "..."}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
