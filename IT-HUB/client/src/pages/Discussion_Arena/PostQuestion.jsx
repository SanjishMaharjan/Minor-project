import { useNavigate, Form, useNavigation, useActionData, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { useState } from "react";
import "./newQuestion.scss";

// import "./QAStyles.scss";

import TextEditor from "./Editor";

const PostQuestion = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const res = useActionData();

  if (res && res.status === 200) return <Navigate to="/question/page/1" />;

  const serverError = res?.status === 404 && res?.data?.msg;
  const questionError = res?.status === 403 && res?.data?.errors?.question;

  if (useNavigation().state === "loading") return <Loader />;
  if (useNavigation().state === "submitting") return <Loader />;
  return (
    <>
      <div>
        <div className="question-bar">
          <h1>Ask a publcic question</h1>

          <Form method="post" action="/question/new" encType="multipart/form-data">
            <h2>Title</h2>
            <p>Be specific and imagine you're asking a question to another person</p>
            <input type="text" name="title" placeholder="Enter title here" />
            <br />
            <p className="input-box"> {serverError ?? null} </p>
            <h2>Body</h2>
            <p>Include all the information someone woulf need to answer your question</p>
            <TextEditor text={text} setText={setText} />

            <input type="text" hidden value={text} name="question" />

            <p className="input-box"> {questionError ?? null} </p>

            <h2>Tags</h2>
            <p>Add up to 5 tags to describe what your question is about</p>
            <input type="text" name="tags" placeholder="Enter tags here" />
            <br />

            <div className="post-question-footer">
              <button onClick={() => navigate(-1)}>Go back</button>
              <label htmlFor="file-input">
                <i
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                  className="fa-solid fa-images"
                ></i>
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
