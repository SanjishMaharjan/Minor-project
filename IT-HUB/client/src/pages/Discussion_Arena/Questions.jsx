import {
  useNavigate,
  useFetcher,
  Link,
  useLoaderData,
  Form,
  useNavigation,
  useParams,
  useLocation,
} from "react-router-dom";
import { getDate } from "../../Utils/dateConverter";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { CgMoreO } from "react-icons/cg";
import "./question.scss";

import Pagination from "../../components/Pagination";

const Questions = () => {
  const { isLoggedIn, user } = useAuth();
  const params = useParams();
  const id = params.id;

  // use location to get the current page
  const location = useLocation();
  let currentPage = location.pathname.split("/")[1];
  let questions;
  if (currentPage === "mydiscussion") {
    questions = useQuery(["myquestion", id], { enabled: false }).data;
  } else if (params.tname) {
    questions = useQuery(["tag", params.tname, id], { enabled: false }).data;
    console.log(questions);
    currentPage = `question/tag/${params.tname}`;
  } else {
    questions = useQuery(["question", id], { enabled: false }).data;
    currentPage = "question";
  }

  const totalPages = questions.totalQuestions;
  const tags = questions.tags;
  questions = questions.questions;

  const fetcher = useFetcher();

  if (useNavigation().state === "loading" && fetcher.formData == null) return <Loader />;

  return (
    <>
      <div className="question-wrapper">
        <div class="question-container">
          {questions.map((question) => (
            <Link to={`/question/${question._id}`} key={question._id}>
              <div className="question">
                <div className="div">
                  <Link to={`/profile/${question.questioner._id}`}>
                    <img src={question.questioner.image.imagePath} height="50" width="50" alt="" />
                  </Link>
                </div>
                <div className="question-content">
                  <h1>{question.questioner.name}</h1>
                  <p>Last engaged {getDate(question.updatedAt) || 1 + "second"} ago</p>
                  <br />
                  <p> {question.title}</p>
                </div>

                <div className="reply">
                  <div className="reply-images">
                    {question.comments.commentIds.map(
                      (image, i) =>
                        i < 3 && (
                          <img
                            src={image.commenter.image.imagePath}
                            height="20"
                            width="20"
                            alt=""
                          />
                        )
                    )}

                    {question.comments.count > 3 && <CgMoreO color="green" fontSize="1.3rem" />}
                  </div>
                  <p>{question.comments.count} comments</p>
                </div>

                <div class="tags-container">
                  {question.tag.map((t) => (
                    <div class="tag">
                      <Link to={`/question/tag/${t}/page/1`}>
                        <p>{t}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="aside">
          <Link to="/question/new">
            <button>Start Discussion</button>
          </Link>
          <Link to={`/mydiscussion/page/1`}>
            <a>My discussion</a>
          </Link>

          <hr />
          <div className="tags">
            {tags.map((tag) => (
              <Link to={`/question/tag/${tag._id}/page/1`} className="tag">
                {tag._id}{" "}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={Number(id)}
        totalPages={Number(totalPages)}
        baseUrl={`/${currentPage}/page`}
      />
    </>
  );
};

export default Questions;
