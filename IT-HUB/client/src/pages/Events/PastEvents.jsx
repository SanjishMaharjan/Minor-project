import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import "./pastEvents.scss";

const PastEvents = () => {
  const { id } = useParams();
  const { data: event } = useQuery(["upcommingEvents", id], {
    enabled: false,
  });

  return (
    <div className="past-event-container">
      <div className="past-event">
        <h1>{event?.title}</h1>
        <p>{event?.description}</p>
        <h1>Venue </h1>
        <p>{event?.location}</p>
        <h1>Time</h1>
        <p>start date: {event?.startDate?.substring(0, 10)}</p>
        <p>end date: {event?.endDate?.substring(0, 10)}</p>
        <Link to={`${event?.link}`}>
          <h2>Fill from here</h2>
        </Link>
        <h1>Contact Info:</h1>
        <p>
          {event?.contactInfo?.name1},{event?.contactInfo?.phone1},
        </p>
        <p>
          {event?.contactInfo?.name2},{event?.contactInfo?.phone2},
        </p>
      </div>
    </div>
  );
};

export default PastEvents;
