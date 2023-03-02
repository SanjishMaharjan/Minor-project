import { Navigate, useLoaderData, useNavigation, useParams } from "react-router-dom";
import { convertToYDHMS } from "../../Utils/dateConverter";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";

import "./StudentStyles.scss";

const StudentProfile = () => {
  let { user } = useAuth();

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
          <img width="300px" height="300px" className="profile-pic" src={user?.image?.imagePath} />
          <div>
            <h3>Name: {user.name}</h3>
            <h3>Role: {user.membership}</h3>
            <h3>Semester: {user.level}</h3>
            <h3>Age:{convertToYDHMS(user.DOB)} </h3>
            <h3>Email: {user.email}</h3>
          </div>
        </div>
      }
    </div>
  );
};

export default StudentProfile;
