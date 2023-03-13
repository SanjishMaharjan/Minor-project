import TextEditor from "./Editor";
import { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import "./editAnswer.scss";

const EditAnswer = ({ comments }) => {
  const fetcher = useFetcher();
  const [text, setText] = useState("");
  const [opened, setOpened] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleButtonClick = () => {
    setOpened(true);
  };

  return (
    <div ref={dropdownRef}>
      <button onClick={handleButtonClick}>Edit Answer</button>
      {opened && (
        <fetcher.Form
          method="post"
          action={`/${comments.questionId}/answer/${comments._id}/update`}
        >
          <TextEditor editText={comments.answer} setText={setText} />
          <input type="text" name="answer" hidden value={text} />
          <button className="update-answer-btn">Update Answer</button>
        </fetcher.Form>
      )}
    </div>
  );
};

export default EditAnswer;
