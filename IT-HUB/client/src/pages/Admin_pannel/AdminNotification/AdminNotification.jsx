import { MdOutlineNotificationsActive } from 'react-icons/md'
import Loader from "../../../components/Loader";
import { useNavigation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import "./adminNotification.scss"

const AdminNotification = () => {
    if (useNavigation().state === "loading") return <Loader />;
    const { data: reportedPost } = useQuery(["reportedPost"], {
        enabled: false,
    });
    return (
        <div className="main-container">
            <h1><MdOutlineNotificationsActive />
                Here are all your Notifications</h1>
            <div className="notification-container">
                <div>
                    {reportedPost.map((report) => (
                        <Link key={report?._id} to={`/question/${report.reportedOn?._id}`}>
                            <div key={report?._id} className="notify">
                                {report.reportedUser.name} has been reported on post <span>{report.reportedOn?.title}</span>
                                <p>Reasons:{report.reasons}</p>
                                <p>{report.count} reports</p>
                                <p>resolved: {report.resolved ? "true" : "false"} </p>
                                {/* <button>resolved</button> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminNotification
