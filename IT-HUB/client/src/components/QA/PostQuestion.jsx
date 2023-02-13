import { useNavigate, Form, redirect } from "react-router-dom";
import axios from "axios";

const PostQuestion = () => {
  const navigate = useNavigate();
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

export const postQuestion = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    question: formData.get("question"),
  };

  const res = await axios.post("http://localhost:5000/api/question", post);

  if (!res.status === 200) throw Error("cannot post data");

  return redirect("/question");
};
