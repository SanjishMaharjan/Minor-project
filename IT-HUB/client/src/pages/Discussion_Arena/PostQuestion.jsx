import { useNavigate, Form, useNavigation, useActionData, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { useState } from "react";

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
          <img
            height="50"
            width="50"
            className="chat-img"
            onClick={() => navigate("/profile")}
            src={user?.image?.imagePath}
          ></img>
          {/* <ReactQuill
            value={editorValue}
            onChange={handleEditorChange}
            formats={formats}
            modules={modules}
          /> */}
          <TextEditor text={text} setText={setText} />
          {console.log(text)}

          <Form method="post" action="/question/new" encType="multipart/form-data">
            <input type="text" name="title" placeholder="Enter title here" />
            <br />
            <p className="input-box"> {serverError ?? null} </p>

            <input type="text" hidden value={text} name="question" />

            <p className="input-box"> {questionError ?? null} </p>
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

const formats = [
  "background",
  "color",
  "code",
  "size",
  "italic",
  "blockquote",
  "list",
  "bullet",
  "link",
  "code-block",
  "formula",
];

const modules = {
  toolbar: [
    ["blockquote", "code-block"], // blocks
    [{ list: "ordered" }, { list: "bullet" }], // lists
    [{ color: [] }, { background: [] }], // dropdown with defaults
    ["clean"], // remove formatting
  ],
};
