import { useState } from "react";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import "./dropdown.scss";
import useAuth from "../../../context/AuthContext";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";

const AnswerDropdown = ({ answer, question }) => {
  const { user, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

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

  return (
    <>
      <div className="answer-dropdown-more" ref={dropdownRef}>
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <AiOutlineEllipsis />
        </button>

        <div className="dropdown-content">
          {showDropdown && (
            <div>
              {user?._id === answer?.commenter?._id || isAdmin ? (
                <div>
                  <fetcher.Form
                    method="post"
                    action={`/${question?.questionId}/answer/${answer?._id}/delete`}
                  >
                    <button>
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </fetcher.Form>
                </div>
              ) : null}
              <button>
                <HiFlag />
                <span>Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerDropdown;
