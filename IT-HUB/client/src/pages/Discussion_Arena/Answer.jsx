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

const Answer = () => {
  const { isLoggedIn, user } = useAuth();

  const { id } = useParams();

  const { data } = useQuery(["answer", id], {
    enabled: false,
  });

  const { questionInfo: question, comments: answers } = data;

  const fetcher = useFetcher();
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
            <h1>How would you describe the community we're creating here on Stack Overflow?</h1>
            <div class="question">
              <Link to={`/profile/${question?.questionerId}`}>
                <img src={question?.questionerImage} height="50" width="50" alt="" />
              </Link>
              <div class="question-content">
                <p>{question?.questioner}</p>
                <span> {getDate(question?.QuestionDate)} ago</span>
                <p>{question?.question}</p>
              </div>
            </div>

            <fetcher.Form method="post" action={`/question/${question?.questionId}`}>
              <div class="form-profile">
                <img src={user.image.imagePath} height="50" width="50" alt="" />
                <input
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
                  <span> {" " + "   " + getDate(answer?.createdAt)} ago</span>
                  <p>{answer.answer}</p>
                </div>
                <div className="answer-icons">
                  {user._id === "question.questioner._id" && (
                    <i className="fa-solid fa-pen-to-square"></i>
                  )}
                  {/* <AiFillHeart className="love" /> */}
                  <fetcher.Form method="post" action={`#`}>
                    <HiFlag className="icons" type="submit" />
                  </fetcher.Form>
                  <fetcher.Form
                    method="post"
                    action={`/${question?.questionId}/answer/${answer._id}/upvote`}
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

          <div class="top-contributers">
            <div class="top-contributer">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <p>Pawel Kadysz</p>
              <span>103</span>
            </div>
            <div class="top-contributer">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <p>Pawel Kadysz</p>
              <span>103</span>
            </div>
            <div class="top-contributer">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <p>Pawel Kadysz</p>
              <span>103</span>
            </div>
            <div class="top-contributer">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <p>Pawel Kadysz</p>
              <span>103</span>
            </div>
            <div class="top-contributer">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <p>Pawel Kadysz</p>
              <span>103</span>
            </div>
          </div>

          <h2>Unanswered Questions</h2>
          <p>Discussion with no comments. Be first to get in a comment</p>

          <div class="unanswered-questions">
            <div class="unanswered-question">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <div class="unanswered-content">
                <p>Pawel Kadysz</p>
              </div>
              <span>3 days ago</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ut enim. Laborum
                ullam dolore fugit perspiciatis, provident ipsum, minus dolores, ut iste doloremque
                eveniet aperiam? Sed modi laboriosam consequuntur tempora?
              </p>
            </div>
            <div class="unanswered-question">
              <img src="../../src/assets/Images/image.jpg" height="20" width="20" alt="" />
              <div class="unanswered-content">
                <p>Pawel Kadysz</p>
              </div>
              <span>3 days ago</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ut enim. Laborum
                ullam dolore fugit perspiciatis, provident ipsum, minus dolores, ut iste doloremque
                eveniet aperiam? Sed modi laboriosam consequuntur tempora?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
