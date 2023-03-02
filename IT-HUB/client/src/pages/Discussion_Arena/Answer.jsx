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
import useAuth from "../../context/AuthContext";
import { convertToYDHMS } from "../../Utils/dateConverter";

const Answer = () => {
  const { isLoggedIn } = useAuth();

  const data = useLoaderData();
  const { id } = useParams();

  const question = data?.question;
  const answer = data?.answer;
  console.log(answer);
  // console.log(question.questioner.image.imagePath);
  // console.log(question.image.imagePath);
  const res = useActionData();

  console.log(res);
  if (res && res.status === 201) return <Navigate to={`/question/${id}`} />;

  const serverError = res?.status === 400 && res?.data?.msg;
  const answerError = res?.status === 403 && res?.data?.errors?.answer;

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="comment-section">
<<<<<<< HEAD
        <div className="chat-message">
          <div className="message-sender">
            <img className="chat-img" width="50px" height="50px" src={question.questioner.image?.imagePath} />
            <h3>{question.questioner.name}</h3>
            <h5>{convertToYDHMS(question?.createdAt) || `1 second`} ago</h5>
          </div>
          <div className="message-content">
            <h4>{question.question}</h4>
            {
              question.image &&
              <img className="posted-img" width="600px" height="auto" src={question?.image?.imagePath} />
            }
          </div>
=======
        <div className="comment-header">
          <h1>
            <img width="50px" height="50px" src={question.questioner.image?.imagePath} />
            {question.question}
          </h1>
          {question.image && <img width="400px" height="400px" src={question?.image?.imagePath} />}
          <h5>{convertToYDHMS(question?.createdAt) || `1 second`} ago</h5>
>>>>>>> 4707b54992a9ded5aea8efc102f8f1ab234ed34f
        </div>

        {answer.map((c) => {
          return (
            <>
              <div className="chat-message">
                <div className="message-sender" onClick={() => navigate("/profile")}>
                  {/* <img className="chat-img" width="50px" height="50px" src={c.questioner.image?.imagePath} /> */}
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
            <button type="submit">Post</button>
          </div>
        </Form>
      )}
    </>
  );
};

export default Answer;
