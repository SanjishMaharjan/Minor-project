import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <>
      <div className="error-container">
        <h1>Not Logged In</h1>
        <p>You need to be logged in to access this page</p>
        <Link to="/login">
          <button>Click here to login</button>
        </Link>
      </div>
    </>
  );
};

export default NotLoggedIn;
