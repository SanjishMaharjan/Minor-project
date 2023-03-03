import { MdOutlineNotificationsActive } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { getDate } from "../../Utils/dateConverter";
import "./notificationStyles.scss";
import { Link } from "react-router-dom";
import { MdClose, MdNotificationsActive } from "react-icons/md";

const Notification = () => {
  const notices = useLoaderData();

  console.log(notices);
  return (
    <div className="notification-container">
      <p>
        <span>
          <MdNotificationsActive />
        </span>
        Here are all your Notifications
      </p>
      <div>
        {notices.map((notice) => (
          <Link key={notice._id} to={`/question/${notice.post._id}`}>
            <p>
              <span>{notice.commenter.name}</span> has commented{" "}
              <span>{notice.comment.answer}</span> in the post <span>{notice.post.question}</span>
              <h3>{getDate(notice.createdAt)} ago</h3>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notification;
