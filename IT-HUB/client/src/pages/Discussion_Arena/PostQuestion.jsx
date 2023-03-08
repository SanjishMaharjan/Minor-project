import { useNavigate, Form, useNavigation, useActionData, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { useState } from "react";
import "./newQuestion.scss";
import { TagsInput } from "react-tag-input-component";
import { BsImages } from "react-icons/bs";

// import "./QAStyles.scss";

import TextEditor from "./Editor";

const PostQuestion = () => {
  const [selected, setSelected] = useState();
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
      <div className="post-question-wrapper">
        <div className="question-bar">
          <h1>Ask a public question</h1>
          <div className="new-question-container">
            <Form method="post" action="/question/new" encType="multipart/form-data">
              <h2>Title</h2>
              <p>Be specific and imagine you're asking a question to another person</p>
              <input type="text" name="title" placeholder="Enter title here" />
              <br />
              <p className="input-box"> {serverError ?? null} </p>
              <h2>Body</h2>
              <p>Include all the information someone would need to answer your question</p>
              <TextEditor text={text} setText={setText} />
              <input type="text" hidden value={text} name="question" />
              <p className="input-box"> {questionError ?? null} </p>
              <h2 className="tags-title">Tags</h2>
              <p>Add up to 5 tags to describe what your question is about</p>
              <TagsInput value={selected} onChange={setSelected} placeHolder="enter tags here" />
              <input type="text" hidden value={selected} name="tag" />
              <em>press enter to add new tag</em>
              <div className="post-question-footer">
                <p className="input-box"> {questionError ?? null} </p>
                <h2 className="image-title">Image</h2>
                <div className="image-input">
                  <label htmlFor="file-input">
                    <p>Input image</p>
                    <BsImages className="image-icon" />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="image"
                      id="file-input"
                      accept=".png,.jpg"
                    />
                  </label>
                </div>
              </div>
              <button className="post-question-button" type="submit">
                Post your question
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostQuestion;
