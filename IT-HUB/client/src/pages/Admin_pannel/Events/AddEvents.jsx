import { BiAddToQueue } from "react-icons/bi";
import { MdOutlineEventNote } from "react-icons/md";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { GoTasklist } from "react-icons/go";
import "./ManageEvents.scss";
import { Link, useNavigate, Form } from "react-router-dom";
import { MdAddLink } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";

//  title, description, startDate, endDate, location;

const AddEvents = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="box-admin">
        <h2 className="manage-events">
          <MdOutlineEventNote />
          Manage Events
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
            {/* <input
              className="event-title-box"
              type="text"
              placeholder="startDate"
              name="startDate"
              autoComplete="off"
            />
            <input
              className="event-title-box"
              type="text"
              placeholder="endDate"
              name="endDate"
              autoComplete="off"
            /> */}
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
            <div className="date-picker">
              <p>Start Date</p>
              <label htmlFor="start-date">
                <input type="date" name="startDate" id="start-date" />
              </label>
              <p>End Date</p>
              <label htmlFor="end-date">
                <input type="date" name="endDate" id="end-date" />
              </label>
            </div>
          </div>

          <button>Post</button>
        </Form>
      </div>
    </div>
  );
};

export default AddEvents;
