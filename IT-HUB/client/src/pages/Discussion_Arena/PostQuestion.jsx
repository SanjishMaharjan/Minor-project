import { useNavigate, Form, useNavigation, useActionData, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";

const PostQuestion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const res = useActionData();

  if (res && res.status === 200) return <Navigate to="/question" />;

  const serverError = res?.status === 404 && res?.data?.msg;
  const questionError = res?.status === 403 && res?.data?.errors?.question;

  if (useNavigation().state === "loading") return <Loader />;
  if (useNavigation().state === "submitting") return <Loader />;
  return (
    <>
      <div>
        <div className="question-bar">
          <img
            className="chat-img"
            onClick={() => navigate("/profile")}
            src={user?.image?.imagePath}
          ></img>
          <Form method="post" action="/question/new" encType="multipart/form-data">
            <p className="input-box"> {serverError ?? null} </p>
            <textarea
              className="post-question"
              type="text"
              rows="15"
              placeholder="Post Your Question"
              name="question"
            />
            <p className="input-box"> {questionError ?? null} </p>
            <div className="post-question-footer">
              <button onClick={() => navigate(-1)}>Go back</button>
              <label htmlFor="file-input">
                <i style={{ fontSize: "2rem", cursor: "pointer" }} className="fa-solid fa-images"></i>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  id="file-input"
                  accept=".png,.jpg"
                />
              </label>
              <button className="post-question-button" type="submit">
                Post
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PostQuestion;
