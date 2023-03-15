import { MdOutlineEventNote } from "react-icons/md";
import { useNavigation, Form } from "react-router-dom";
import Loader from "../../../components/Loader";

import "./addEvents.scss";
const AddEvents = () => {
  if (useNavigation().state === "loading ") return <Loader />;

  return (
    <div className="add-event-container">
      <h2 className="manage-events">
        <MdOutlineEventNote />
        Add Events
      </h2>

      <Form
        method="POST"
        action="/admin/addEvent"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
          }
        }}
      >
        <div className="events-details">
          <input
            className="event-title-box"
            type="text"
            placeholder="title"
            name="title"
            autoComplete="off"
          />
          <textarea
            className="event-desc-box"
            type="text-area"
            placeholder="Description"
            name="description"
            autoComplete="off"
          />

          <input
            className="event-title-box"
            type="text"
            placeholder="location"
            name="location"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Add Link"
            name="link"
            autoComplete="off"
            className="event-title-box"
          />
          <div className="event-contact">
            <input
              type="text"
              placeholder="Add name1"
              name="name1"
              autoComplete="off"
              className="event-title-box"
            />

            <input
              type="text"
              placeholder="Add phone1"
              name="phone1"
              autoComplete="off"
              className="event-title-box"
            />
          </div>
          <div className="event-contact">
            <input
              type="text"
              placeholder="Add name2"
              name="name2"
              autoComplete="off"
              className="event-title-box"
            />

            <input
              type="text"
              placeholder="Add phone2"
              name="phone2"
              autoComplete="off"
              className="event-title-box"
            />
          </div>
          <div className="date-picker">
            <div>
              <p>Start Date</p>
              <label htmlFor="start-date">
                <input type="date" name="startDate" id="start-date" />
              </label>
            </div>
            <div>
              <p>End Date</p>
              <label htmlFor="end-date">
                <input type="date" name="endDate" id="end-date" />
              </label>
            </div>
          </div>
        </div>

        <button>Post</button>
      </Form>
    </div>
  );
};

export default AddEvents;
