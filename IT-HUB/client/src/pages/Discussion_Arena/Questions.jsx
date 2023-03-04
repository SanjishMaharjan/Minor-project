import {
  useNavigate,
  useFetcher,
  Link,
  useLoaderData,
  Form,
  useNavigation,
} from "react-router-dom";
import "./QAStyles.scss";
import { getDate } from "../../Utils/dateConverter";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";

import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
const queryKey = ["question"];

const Questions = () => {
  const { isLoggedIn, user } = useAuth();

  const { data: chat } = useQuery(queryKey, { enabled: false });

  const fetcher = useFetcher();

  if (useNavigation().state === "loading" && fetcher.formData == null) return <Loader />;

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Code Cafe : A Space where solutions meet expertise</h1>
        <br />
        <div className="question-bar">
          <Link to="/profile">
            <img className="question-img" src={user?.image?.imagePath}></img>
          </Link>

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
          <div key={talk._id} className="chat-message">
            <div className="message-sender">
              <Link to={`/profile/${talk.questioner._id}`}>
                <img className="chat-img" src={talk.questioner.image.thumb}></img>
                <h3>{talk.questioner.name}</h3>
              </Link>
              <h5>{getDate(talk.createdAt) || `1 second`} ago</h5>
            </div>
            <div className="message-content">{talk.question}</div>
            <div className="message-footer">
              {isLoggedIn && (
                <>
                  <fetcher.Form method="post" action={`/question/${talk._id}/upvote`}>
                    <button type="submit">
                      {talk.upvote.upvoters.includes(user._id) ? <BiDownvote /> : <BiUpvote />}
                    </button>
                  </fetcher.Form>
                  <h3>{talk.upvote.count}</h3>
                </>
              )}
              <Link to={`/question/${talk._id}`}>
                <BiComment />
              </Link>
              {isLoggedIn && <HiFlag />}

              {user._id === talk.questioner._id && <i className="fa-solid fa-pen-to-square"></i>}

              {user._id === talk.questioner._id && (
                <fetcher.Form method="delete" action={`/question/${talk._id}/delete`}>
                  <button type="submit">
                    <FaTrash />
                  </button>
                </fetcher.Form>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
