import { Navigate, useLoaderData, useNavigation, useParams } from "react-router-dom";
import { convertToYDHMS } from "../../Utils/dateConverter";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import "./StudentStyles.scss";

const StudentProfile = () => {
  let { isLoggedIn, user } = useAuth();
  // if not logged in moved and wants to access profile navigate to login
  // if (!isLoggedIn) return <Navigate to="/login" />;
  // if(!id) profile= user
  // profile =
  const profile = useLoaderData();
  console.log(user);
  const { id } = useParams();
  if (id) user = profile;

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <div className="student-wrapper">
      <h1>Profile</h1>
      {
        <div className="student-details">
          <img className="profile-pic" src={user?.image?.imagePath} />
          <div className="student-info">
            <div>Name: {user.name}</div>
            <div>Role: {user.membership}</div>
            <div>Semester: {user.level}</div>
            <div>Age:{convertToYDHMS(user.DOB)} </div>
            <div>Email: {user.email}</div>
            <div className="social-handles">
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default StudentProfile;
