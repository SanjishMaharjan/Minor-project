import { useState } from "react";
import { HiFlag } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import "./dropdown.scss";
import useAuth from "../../context/AuthContext";
import { Form, useFetcher } from "react-router-dom";

const Dropdown = ({ answer, question }) => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const fetcher = useFetcher();
  //   if (useNavigation().state === "loading" && fetcher.formData == null) return <Loader />;

  return (
    <>
      <div className="dropdown-more">
        <button onClick={() => setShowDropdown(!showDropdown)}>
          <i className="fas fa-ellipsis-h"></i>
        </button>
        {showDropdown && (
          <div>
            {user?._id === answer?.commenter?._id && (
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
                <button>
                  <BiEditAlt />
                  <span>Edit</span>
                </button>
              </>
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

export default Dropdown;
