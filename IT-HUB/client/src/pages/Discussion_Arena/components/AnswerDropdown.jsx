import { useState } from "react";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import "./dropdown.scss";
import useAuth from "../../../context/AuthContext";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";
import EditAnswer from "./EditAnswer";

const AnswerDropdown = ({ answer, question }) => {
  const { user, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [editAnswer, setEditAnswer] = useState(null);

  const fetcher = useFetcher();

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef]);

  const showEditAnswer = (answer) => {
    setShowDropdown(false);
    setEditAnswer(answer);
  };
  return (
    <>
      <div className="answer-dropdown-more" ref={dropdownRef}>
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <AiOutlineEllipsis />
        </button>

        {showDropdown && (
          <div className="answer-dropdown-content">
            {user?._id === answer?.commenter?._id || isAdmin ? (
              <>
                <fetcher.Form
                  method="post"
                  action={`/${question?.questionId}/answer/${answer?._id}/delete`}
                >
                  <input type="text" value="lol" hidden />
                  <button>
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </fetcher.Form>
              </>
            ) : null}

            {user._id === answer?.commenter?._id && (
              <button onClick={() => showEditAnswer(answer)}>
                <BiEditAlt />
                <span>Edit</span>
              </button>
            )}

            {!answer.isReported && (
              <button>
                <HiFlag />
                <span>Report</span>
              </button>
            )}
          </div>
        )}
        {editAnswer && (
          <div className="dropdown-answer-edit">
            <EditAnswer
              comments={editAnswer}
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AnswerDropdown;
