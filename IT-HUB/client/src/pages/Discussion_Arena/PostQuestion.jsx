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
          <img
            className="question-img"
            onClick={() => navigate("/profile")}
            src={user?.image?.imagePath}
          ></img>

          <Form method="post" action="/question/new">
            <input
              className="post-question"
              type="text"
              placeholder="Post Your Question"
              name="question"
            />
            <button className="post-question-button" type="submit">
              Post
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PostQuestion;
