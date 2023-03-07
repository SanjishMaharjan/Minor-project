import {
  useLoaderData,
  useNavigation,
  Form,
  Link,
  Navigate,
  useActionData,
  useParams,
  useFetcher,
} from "react-router-dom";
import Loader from "../../components/Loader";
import { getDate } from "../../Utils/dateConverter";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

import useAuth from "../../context/AuthContext";
import "./answer.scss";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useState } from "react";

const Answer = () => {
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);

  const { isLoggedIn, user } = useAuth();

  const { id } = useParams();

  const { data } = useQuery(["answer", id], {
    enabled: false,
  });

  const {
    questionInfo: question,
    comments: answers,
    unAnswered,
    topContributor: contributors,
  } = data;

  const fetcher = useFetcher();

  console.log(contributors);

  const res = fetcher.data;

  if (res && res.status === 201) return <Navigate to={`/question/${id}`} />;

  const serverError = res?.status === 400 && res?.data?.msg;
  const answerError = res?.status === 403 && res?.data?.errors?.answer;

  if (useNavigation().state === "loading" && fetcher.formData == null) return <Loader />;

  return (
    <>
      <div class="answer-wrapper">
        <div class="first-col">
          <div class="answer-header">
            <h1>{question.questionTitle}</h1>
            <div class="question">
              <Link to={`/profile/${question?.questionerId}`}>
                <img src={question?.questionerImage} height="50" width="50" alt="" />
              </Link>
              <div class="question-content">
                <div>
                  <p>{question?.questioner}</p>
                  <span> {getDate(question?.QuestionDate)} ago</span>
                </div>

                <div>
                  {question?.QuestionImage?.imagePath && (
                    <img
                      height="100"
                      width="100"
                      className="image question-image"
                      src={question?.QuestionImage?.imagePath}
                      onClick={() => setShowImageFullScreen(true)}
                      alt=""
                    />
                  )}
                  {showImageFullScreen && (
                    <div className="fullscreen-image" onClick={() => setShowImageFullScreen(false)}>
                      <img className="image" src={question.QuestionImage.imagePath} alt="" />
                    </div>
                  )}
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question?.question) }}
                ></div>
              </div>
            </div>
            <fetcher.Form method="post" action={`/question/${question?.questionId}`}>
              <div class="form-profile">
                <img src={user.image.imagePath} height="50" width="50" alt="" />

                <textarea
                  cols={30}
                  rows={5}
                  className="answer-input"
                  type="text"
                  name="answer"
                  placeholder={`click here to answer ${question?.questioner}`}
                />
              </div>
              <div class="button">
                <button>Post comment</button>
                {answerError && <p className="error">{answerError}</p>}
                {serverError && <p className="error">{serverError}</p>}
              </div>
            </fetcher.Form>
          </div>

          <p class="comment-no">{answers.length} comments</p>

          <div class="answer-container">
            {answers.map((answer) => (
              <div class="answer">
                <img src={answer?.commenter?.image?.imagePath} height="50" width="50" alt="" />
                <div class="question-content">
                  <p>{answer?.commenter?.name + " "} </p>
                  <span>
                    {getDate(answer.createdAt) === undefined
                      ? 1 + " second "
                      : getDate(answer.createdAt) + " "}
                    ago
                  </span>
                  <p>{answer.answer}</p>
                </div>
                <div className="answer-icons">
                  {user._id === "question.questioner._id" && (
                    <i className="fa-solid fa-pen-to-square"></i>
                  )}

                  <fetcher.Form
                    method="post"
                    action={`/${question?.questionId}/answer/${answer?._id}/upvote`}
                  >
                    <button>
                      {answer?.upvote?.upvoters.includes(user._id) ? (
                        <AiFillHeart className="love" fill="green" />
                      ) : (
                        <FaRegHeart className="love" />
                      )}
                    </button>
                  </fetcher.Form>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div class="aside">
          <h2>Top Contributers</h2>
          <p>People who engaged most on discussion</p>

          <div className="top-contributers">
            {contributors.map((contributor) => (
              <div className="top-contributer" key={contributor.name}>
                <Link to={`/profile/${contributor?._id}`}>
                  <img src={contributor.image.imagePath} height="20" width="20" alt="" />
                </Link>
                <p> {contributor.name}</p>
                <span>{contributor.contribution}</span>
              </div>
            ))}
          </div>

          <h2>Unanswered Questions</h2>
          <p>Discussion with no comments. Be first to get in a comment</p>

          <div class="unanswered-questions">
            {unAnswered.map((question) => (
              <Link to={`/question/${question._id}`}>
                <div class="unanswered-question">
                  <Link to={`/profile/${question.questioner._id}`}>
                    <img src={question.questioner.image.imagePath} height="20" width="20" alt="" />
                  </Link>
                  <div class="unanswered-content">
                    <p>{question.questioner.name}</p>
                  </div>
                  <span>{getDate(question.createdAt)} ago </span>
                  <p>{question.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
