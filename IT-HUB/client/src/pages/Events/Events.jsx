import React from "react";
import { useQuery } from "@tanstack/react-query";

import "./events.scss";

const Events = () => {
  const { data: events } = useQuery(["events"], {
    enabled: false,
  });

  const { expiredEvents, upCommingEvents } = events;
  console.log(expiredEvents, upCommingEvents);

  return (
    <div class="events-wrapper">
      <div class="upcomming-events">
        <h1>Upcomming Events</h1>
        {upCommingEvents?.map((event) => (
          <div class="upcomming-event" key={event?._id}>
            <p>{event.startDate.substring(0, 10)} </p>
            <h2>{event.title}</h2>
            <p>{event.description.substring(0, 100) + "..."}</p>
          </div>
        ))}
      </div>
      <div class="past-events">
        <h1>Past events</h1>
        <div class="past-events-container">
          {expiredEvents?.map((event) => (
            <div class="past-event" key={event?._id}>
              <img src={event?.gallery[0]?.imagePath} width="550" height="300" alt="" />
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
