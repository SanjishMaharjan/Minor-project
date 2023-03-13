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

import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

import useAuth from "../../context/AuthContext";
import "./answer.scss";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useState, useRef, useMemo } from "react";
import TextEditor from "./components/Editor";
import AnswerDropdown from "./components/AnswerDropdown";
import QuestionDropdown from "./components/QuestionDropdown";

const Answer = () => {
  const comment = useRef("");
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const [text, setText] = useState("");
  const memoizedText = useMemo(() => text, [text]);

  const { isLoggedIn, user, isAdmin } = useAuth();

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

  const res = fetcher.data;

  if (res && res.status === 200) {
    // document.querySelector(".answer-input").value = "";
    console.log("here");
  }

  const serverError = res?.message === "Network Error" && "long comment cannot be posted";
  const answerError = res?.status === 403 && res?.data?.errors?.answer;

  if (useNavigation().state === "loading" && fetcher.formData == null) return <Loader />;

  return (
    <>
      <div class="answer-wrapper">
        <div class="first-col">
          <div class="answer-header">
            <div class="question-header">
              <h1>{question?.questionTitle}</h1>
              {question?.questionerId === user?._id || isAdmin ? (
                <QuestionDropdown question={question} />
              ) : null}
            </div>
            <div class="question">
              <div>
                <Link to={`/profile/${question?.questionerId}`}>
                  <img src={question?.questionerImage} height="50" width="50" alt="" />
                </Link>
              </div>
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
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(question?.question),
                  }}
                ></div>
              </div>
            </div>
            <fetcher.Form method="post" action={`/question/${question?.questionId}`}>
              <div class="form-profile">
                <img src={user.image.imagePath} height="50" width="50" alt="" />
                <TextEditor text={text} setText={setText} />

                <input type="text" name="answer" value={memoizedText} hidden />
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
              <div class="answer" key={answer._id}>
                <img src={answer?.commenter?.image?.imagePath} height="50" width="50" alt="" />
                <div class="question-content">
                  <p>{answer?.commenter?.name + " "} </p>
                  <span>
                    {getDate(answer.createdAt) === undefined
                      ? 1 + " second "
                      : getDate(answer.createdAt) + " "}
                    ago
                  </span>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(answer?.answer),
                    }}
                  ></div>
                  {/* <p>{answer.answer}</p> */}
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
                  <AnswerDropdown answer={answer} question={question} />
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

          <h2 className="unanswered-title">Unanswered Questions</h2>
          <p className="unanswered-detail">
            Discussion with no comments. Be first to get in a comment
          </p>

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
