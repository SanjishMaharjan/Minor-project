import { useNavigate } from "react-router-dom";

const Handle404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error-container">
        <h1>404 Not found </h1>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
};

export default Handle404;
