import { useLoaderData, useNavigation, Form, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useContext } from "react";
import { context } from "../../context/Context";

const Answer = () => {
  const { isLoggedIn } = useContext(context);

  const [answer, question] = useLoaderData();

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="comment-section">
        <h1 className="answer-title">{question.question}</h1>
        {answer.map((c) => {
          return (
            <>
              <div className="chat-message">
                <div className="message-content">
                  <div className="message-sender">
                    <Link to={`/profile/${"scs"}`}>
                      <i className="commentor-name">{c.commenter.name}</i>
                    </Link>
                    <span>{c.answer}</span>
                    <Form method="delete">
                      <button type="submit" className="delete-comment">
                        <i className="fa-solid fa-trash delete-comment"></i>
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        {/* to comment on any post */}

        {isLoggedIn && (
          <Form method="post" action={`/${question._id}/comment/new`} className="answer-form">
            <input
              className="post-question"
              type="text"
              placeholder="Post Your Opinion"
              name="answer"
            />

            <label htmlFor="file-input">
              <i class="fa-solid fa-images"></i>
              <input
                style={{ display: "none" }}
                type="file"
                name="photo"
                id="file-input"
                accept=".png,.jpg"
              />
            </label>
            <button className="post-question-button" type="submit">
              Post
            </button>
          </Form>
        )}
      </div>
    </>
  );
};

export default Answer;
