import {
  Navigate,
  useLoaderData,
  useNavigation,
  useParams,
  useFetcher,
  useActionData,
} from "react-router-dom";
import { getDate } from "../../Utils/dateConverter";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { FiEdit3 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

import "./StudentStyles.scss";

const StudentProfile = () => {
  let { user, setUser } = useAuth();
  const { id } = useParams();

  const { data: profile } = useQuery(["profile", id], {
    enabled: false,
  });

  // const profile = useLoaderData();
  const res = useActionData();
  // console.log(user);
  const fetcher = useFetcher();

  if (id) user = profile;

  const serverError = res?.status === 400 && res?.data?.msg;
  const fileError = res?.status === 403 && res?.data?.errors?.image;
  if (useNavigation().state === "loading") return <Loader />;
  if (res && res?.data?.status === 200) return <Navigate to="/profile" />;

  return (
    <div className="student-wrapper">
      <p>{fileError ?? null}</p>
      <p>{serverError ?? null}</p>
      <h1>Profile</h1>
      {
        <div className="student-details">
          <img width="300px" height="300px" className="profile-pic" src={user?.image?.imagePath} />
          <span>
            {!id && (
              <fetcher.Form method="post" action="/profile" encType="multipart/form-data">
                <label htmlFor="file-input">
                  <FiEdit3 />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name="image"
                    id="file-input"
                    accept=".png,.jpg"
                  />
                </label>
                <button>edit</button>
              </fetcher.Form>
            )}
          </span>
          <div>
            <h3>Name: {user.name}</h3>
            <h3>Role: {user.membership}</h3>
            <h3>Semester: {user.level}</h3>
            <h3>Age:{getDate(user.DOB)} </h3>
            <h3>Email: {user.email}</h3>
          </div>
        </div>
      }
    </div>
  );
};

export default StudentProfile;
