import { BiConversation } from "react-icons/bi";
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
            <div className="notify">
              {notice.commenter.name} has commented <span>{notice.comment.answer}</span> on your post <span>{notice.post.question}</span>
              <p>{getDate(notice.createdAt)} ago</p>
              {/* <button>view</button> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notification;
