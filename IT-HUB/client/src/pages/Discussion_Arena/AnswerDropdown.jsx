import { useState } from "react";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import "./dropdown.scss";
import useAuth from "../../context/AuthContext";
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
      <div className="dropdown-more" ref={dropdownRef}>
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <AiOutlineEllipsis />
        </button>

        {showDropdown && (
          <div className="dropdown-content">
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
              <button>
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
      </div>
    </>
  );
};

export default AnswerDropdown;
