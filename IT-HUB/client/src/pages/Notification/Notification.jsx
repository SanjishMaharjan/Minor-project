import { MdOutlineNotificationsActive } from 'react-icons/md'
import { useLoaderData } from 'react-router-dom';
import { getDate } from '../../Utils/dateConverter';
import "./notificationStyles.scss"

const Notification = () => {
    const notices = useLoaderData();
    console.log(notices);
    return (
        <div className='nofication-container'>
            <h1><MdOutlineNotificationsActive style={{ fontSize: "7rem" }} /><br />
                Here are all your Notifications</h1>
            {notices.map((notice) => {
                return (
                    <div key={notice._id} >
                        <p>Dear, {notice.user}</p>
                        <p>{notice.commenter} has commented {notice.comment} in your </p>
                        <p>in this post {notice.post}</p>
                        <p>{getDate(notice.createdAt)} ago</p>
                    </div>
                );
            })}
        </div>
    )
}

export default Notification
