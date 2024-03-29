import { useState } from "react";
import { HiFlag } from "react-icons/hi";
import { FaFlag, FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import "./dropdown.scss";
import useAuth from "../../../context/AuthContext";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";

const QuestionDropdown = ({ question }) => {
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
        <div className="dropdown-content">
          {showDropdown && (
            <div>
              <fetcher.Form method="post" action={`/question/${question.questionId}/delete`}>
                <input type="text" value="lol" hidden />
                <button>
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </fetcher.Form>
              <fetcher.Form method="post" action={`/question/${question.questionId}/report`}>
                <input type="text" value="lol" hidden />
                <button>
                  <FaFlag />
                  <span>Report</span>
                </button>
              </fetcher.Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionDropdown;
