import { useNavigate, Form, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";

const PostQuestion = () => {
  const navigate = useNavigate();
  if (useNavigation().state === "loading") return <Loader />;
  return (
    <>
      <div>
        <div className="question-bar">
          <img
            className="question-img"
            onClick={() => navigate("/profile")}
            src="https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg"
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
