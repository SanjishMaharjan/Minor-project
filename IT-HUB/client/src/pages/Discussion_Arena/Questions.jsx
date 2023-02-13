import { useNavigate, Link, useLoaderData, Form, useNavigation } from "react-router-dom";
import { useState, useContext } from "react";
import "./QAStyles.css";
import { convertToYDHMS } from "../../Utils/dateConverter";

import { context } from "../../context/Context";
import Loader from "../../components/Loader";

const Questions = () => {
  const chat = useLoaderData();
  const { isLoggedIn, user } = useContext(context);

  const navigate = useNavigate();

  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1 >Code Cafe : A Space where solutions meet expertise</h1>
        <br />
        <div className="question-bar">
          <img
            className="question-img"
            onClick={() => navigate("/profile")}
            src={user?.image?.imagePath}
          ></img>

          <Link to="/question/new" >
            <Form method="post">
              <input
                className="post-question"
                type="text"
                placeholder="Post Your Question"
                name="question"
              />
              <button>Post</button>
            </Form>
          </Link>
        </div>
        <br />
      </div>

      {
        chat.map((talk) => {
          return (
            <>
              <div key={talk.questioner.name} className="chat-message">
                <div className="message-sender" onClick={() => navigate("/profile")}>
                  <img
                    className="chat-img"
                    onClick={() => navigate("/profile")}
                    src={talk.questioner.image.imagePath}
                  ></img>
                  <h3>{talk.questioner.name}</h3>
                  <h5>{convertToYDHMS(talk.createdAt) || `1 second`} ago</h5>
                </div>
                <div className="message-content">{talk.question}</div>
                <div className="message-footer">
                  {isLoggedIn && (
                    <i
                      className={isActive ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}
                      onClick={toggleClass}
                      style={{ fontSize: "0.8rem" }}
                    ></i>
                  )}
                  <Link to={`/question/${talk._id}`}>
                    <i className="fa-solid fa-comment"></i>
                  </Link>
                  {isLoggedIn && <i className="fa-solid fa-font-awesome"></i>}

                  {user._id === talk.questioner._id && <i class="fa-solid fa-pen-to-square"></i>}

                  {user._id === talk.questioner._id && (
                    <Form method="delete" action={`/question/${talk._id}/delete`}>
                      <button type="submit">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </Form>
                  )}
                </div>
              </div>
            </>
          );
        })
      }
    </div >
  );
};

export default Questions;
