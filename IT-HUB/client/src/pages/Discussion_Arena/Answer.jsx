import { useLoaderData, useNavigation, Form, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const Answer = () => {
  const { isLoggedIn } = useAuth();

  const { answer, question } = useLoaderData();

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="comment-section">
        <div className="comment-header">
          <h1>
            <i class="fa-brands fa-rocketchat"></i> {question.question}
          </h1>
        </div>
        {answer.map((c) => {
          return (
            <>
              <div className="chat-message">
                <div className="message-sender" onClick={() => navigate("/profile")}>
                  <Link to={`/profile/${"scs"}`}>
                    <h3>{c?.commenter?.name}</h3>
                  </Link>
                  <h5>{convertToYDHMS(c?.createdAt) || `1 second`} ago</h5>
                </div>
                <div className="message-content">{c.answer}</div>

                <div className="message-footer">
                  <i style={{}} className="fa-solid fa-angle-up"></i>

                  {isLoggedIn && <i className="fa-solid fa-font-awesome"></i>}

                  {<i class="fa-solid fa-pen-to-square"></i>}

                  {
                    <Form method="delete" action={`/question/${c._id}/delete`}>
                      <button type="submit">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </Form>
                  }
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
