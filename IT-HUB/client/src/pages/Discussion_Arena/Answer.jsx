import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";

const Answer = () => {
  const answer = useLoaderData();

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div>
        {answer.map((c) => {
          return (
            <>
              <div className="chat-message">
                <div className="message-content">
                  <div className="message-sender">{c.answer}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Answer;
