import { useNavigate, Form, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import { useContext } from "react";
import { context } from "../../context/Context";

const PostQuestion = () => {
  const navigate = useNavigate();
  const { user } = useContext(context);
  if (useNavigation().state === "loading") return <Loader />;
  return (
    <>
      <div>
        <div className="question-bar">
          <Form method="post" action="/question/new">
            <textarea
              className="post-question"
              type="text"
              rows="15"
              placeholder="Post Your Question"
              name="question"
            />
            <br />
            <br />
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
              style={{ marginLeft: "41.5rem" }}
              className="post-question-button"
              type="submit"
            >
              Post
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PostQuestion;
