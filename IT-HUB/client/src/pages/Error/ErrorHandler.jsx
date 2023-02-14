import { useRouteError, Link, useNavigate } from "react-router-dom";
import "./errorhandler.css";

const ErrorHandler = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <>
      <div className="error-container">
        <h1>{error.message || "error occured"}</h1>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
};

export default ErrorHandler;
