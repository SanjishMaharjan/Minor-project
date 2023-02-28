import {
  useLoaderData,
  useNavigation,
  Form,
  Link,
  Navigate,
  useActionData,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { convertToYDHMS } from "../../Utils/dateConverter";

const Answer = () => {
  const { isLoggedIn } = useAuth();

  const data = useLoaderData();
  const { id } = useParams();

  const question = data?.question;
  const answer = data?.answer;

  const res = useActionData();

  console.log(res);
  if (res && res.status === 201) return <Navigate to={`/question/${id}`} />;

  const serverError = res?.status === 400 && res?.data?.msg;
  const answerError = res?.status === 403 && res?.data?.errors?.answer;

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="comment-section">
        <div className="comment-header">
          <h1>
            <i class="fa-brands fa-rocketchat"></i> {question.question}
          </h1>
        </div>

        {isLoggedIn && (
          <Form method="post" action={`/question/${question._id}`} className="answer-form">
            <p className="error">{serverError ?? null}</p>
            <input
              className="post-question"
              type="text"
              placeholder="Post Your Opinion"
              name="answer"
            />

            <p className="error">{answerError ?? null}</p>

            <div className="comment-button">
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
              <button type="submit">Post</button>
            </div>
          </Form>
        )}
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
      </div>
    </>
  );
};

export default Answer;
