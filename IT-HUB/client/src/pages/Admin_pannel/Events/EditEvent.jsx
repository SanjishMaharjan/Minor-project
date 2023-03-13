import { useQuery } from "@tanstack/react-query";
import { useParams, Form } from "react-router-dom";
import { MdAddLink } from "react-icons/md";
import Loader from "../../../components/Loader";
import { useNavigation } from "react-router-dom";

const EditEvent = () => {
  const { data: events } = useQuery(["events"], {
    enabled: false,
  });

  const { id } = useParams();
  const { expiredEvents, upCommingEvents } = events;
  const event =
    expiredEvents.find((event) => event._id === id) ||
    upCommingEvents.find((event) => event._id === id);

  if (useNavigation().state === "submitting") return <Loader />;

  return (
    <>
      <div className="main-container">

        <Form
          method="POST"
          action={`/admin/editEvent/${event._id}`}
          encType="multipart/form-data"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
              e.preventDefault();
            }
          }}
        >
          <div className="events-details">
            <p>Title</p>
            <input
              className="event-title-box"
              type="text"
              placeholder="title"
              name="title"
              autoComplete="off"
              defaultValue={event.title}
            />
            <p>Description</p>
            <textarea
              className="event-desc-box"
              type="text-area"
              placeholder="Description"
              name="description"
              autoComplete="off"
              defaultValue={event.description}
            />
            <input
              className="event-title-box"
              type="text"
              placeholder="startDate"
              name="startDate"
              autoComplete="off"
              defaultValue={event.startDate}
            />
            <input
              className="event-title-box"
              type="text"
              placeholder="endDate"
              name="endDate"
              autoComplete="off"
              defaultValue={event.endDate}
            />
            <p>Location</p>
            <input
              className="event-title-box"
              type="text"
              placeholder="location"
              name="location"
              autoComplete="off"
              defaultValue={event.location}
            />
          </div>
          <div className="img-link-menu">
            <label htmlFor="link-input">
              {<MdAddLink className="admin-icons" />}
              <input
                style={{ display: "none" }}
                type="file"
                name="images"
                id="link-input"
                accept=".png,.jpg,.jpeg"
                multiple
              />
            </label>
          </div>
          <button style={{ marginTop: "1rem" }}>Post</button>
        </Form>
      </div>
    </>
  );
};

export default EditEvent;
