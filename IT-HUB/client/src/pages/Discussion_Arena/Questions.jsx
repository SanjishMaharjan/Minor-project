import { useNavigate, Link, useLoaderData, Form, useNavigation } from "react-router-dom";
import { useState } from "react";
import "./QAStyles.css";
import { convertToYDHMS } from "../../Utils/dateConverter";

import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const Questions = () => {
  const chat = useLoaderData();
  console.log(chat);
  const { isLoggedIn, user } = useAuth();

  const navigate = useNavigate();
  console.log(user._id)


  if (useNavigation().state === "loading") return <Loader />;

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Code Cafe : A Space where solutions meet expertise</h1>
        <br />
        <div className="question-bar">
          <img
            className="question-img"
            onClick={() => navigate("/profile")}
            src={user?.image?.imagePath}
          ></img>

          <Link to="/question/new">
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

      {chat.map((talk) => {
        return (
          <>
            <div key={talk.questioner.name} className="chat-message">
              <div className="message-sender">
                <Link to={`/profile/${talk.questioner._id}`}>
                  <img
                    className="chat-img"
                    src={talk.questioner.image.imagePath}
                  ></img>
                  <h3>{talk.questioner.name}</h3>
                </Link>
                <h5>{convertToYDHMS(talk.createdAt) || `1 second`} ago</h5>
              </div>
              <div className="message-content">{talk.question}</div>
              <div className="message-footer">
                {isLoggedIn && (
                  <>
                    <Form method="post" action={`/question/${talk._id}/upvote`}>
                      <button type="submit">
                        <i
                          className={(talk.upvote.upvoters.includes(user._id)) ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"}
                          style={{ fontSize: "0.8rem" }}
                        ></i>
                        {console.log(user._id in talk.upvote.upvoters)}

                      </button>
                    </Form>
                    <h3>{talk.upvote.count}</h3>
                  </>
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
      })}
    </div>
  );
};

export default Questions;
