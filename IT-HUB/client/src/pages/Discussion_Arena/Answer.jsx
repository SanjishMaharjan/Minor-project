import { useLoaderData, useNavigation, Form } from "react-router-dom";
import Loader from "../../components/Loader";

const Answer = () => {
  // const answer = useLoaderData();

  const [answer, question] = useLoaderData();
  console.log(answer, question);
  console.log(question._id);
  if (useNavigation().state === "loading") return <Loader />;
  console.log(answer)

  return (
    <>
      <div className="comment-section">
        <h1>{question.question}</h1>
        {answer.map((c) => {
          return (
            <>
              <div className="chat-message">
                <div className="message-content">
                  <div className="message-sender"><i class="fa-solid fa-reply"></i><br /> {c.answer}</div>
                </div>
              </div>
            </>
          );
        })}

        {/* to comment on any post */}
        <Form method="post" action={`/${question._id}/comment/new`}>
          <input
            className="post-question"
            type="text"
            placeholder="Post Your Opinion"
            name="answer"
          />
          <br />
          <br />
          <label htmlFor="file-input">
            <i style={{ fontSize: "2rem", cursor: "pointer" }} class="fa-solid fa-images"></i>
            <input
              style={{ display: "none" }}
              type="file"
              name="photo"
              id="file-input"
              accept=".png,.jpg"
            />
          </label>
          <button style={{ marginLeft: "41.5rem" }} className="post-question-button" type="submit">
            Post
          </button>
        </Form>
      </div>
    </>
  );
};

export default Answer;
