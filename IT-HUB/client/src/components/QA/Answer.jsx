import { useLoaderData } from "react-router-dom";
import axios from "axios";

const Answer = () => {
  const answer = useLoaderData();

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

export const getAnswer = async ({ params }) => {
  const { id } = params;
  const response = await axios.get(`http://localhost:5000/api/${id}/comment`);
  if (response.status != 200) throw new Response("Not Found", { status: 404 });

  return response.data;
};
