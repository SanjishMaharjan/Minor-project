import { Form } from "react-router-dom";
import { MdAddLink } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import "./ManageEvents.scss";
const AddEventForm = () => {
  return (
    <div>
      <Form method="POST" action="">
        <div className="events-details">
          {/* <label htmlFor="title">Title</label> */}
          <input
            className="event-title-box"
            type="text"
            placeholder="title"
            name="title"
            id="title"
            autoComplete="off"
          />
          {/* <label htmlFor="description">Description</label> */}
          <textarea
            className="event-desc-box"
            type="text-area"
            placeholder="Description"
            name="description"
            id="description"
            autoComplete="off"
          />
        </div>
        <div className="img-link-menu">
          <label htmlFor="img-input">
            {<BiImageAdd className="admin-icons" />}
            <input
              style={{ display: "none" }}
              type="file"
              name="fileUpload"
              id="img-input"
              accept=".png,.jpg"
            />
          </label>
          <label htmlFor="link-input">
            {<MdAddLink className="admin-icons" />}
            <input
              style={{ display: "none" }}
              type="file"
              name="fileUpload"
              id="link-input"
              accept=".pdf,.ppt"
            />
          </label>
        </div>
      </Form>
    </div>
  );
};

export default AddEventForm;
