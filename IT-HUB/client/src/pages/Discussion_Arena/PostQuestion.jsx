import { useNavigate, Form, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const PostQuestion = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (useNavigation().state === "loading") return <Loader />;
  return (
    <>
      <div>
        <div className="question-bar">
          <img
            className="chat-img"
            onClick={() => navigate("/profile")}
            src={user?.image?.imagePath}
          ></img>
          <Form method="post" action="/question/new">
            <textarea
              className="post-question"
              type="text"
              rows="15"
              placeholder="Post Your Question"
              name="question"
            />
            <div className="post-question-footer">
              <button onClick={() => navigate(-1)}>Go back</button>
              <label htmlFor="file-input">
                <i style={{ fontSize: "2rem", cursor: "pointer" }} class="fa-solid fa-images"></i>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="question"
                  id="file-input"
                  accept=".png,.jpg"
                />
              </label>
              <button
                className="post-question-button"
                type="submit"
              >
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
