import { useRouteError, Link } from "react-router-dom";

const ErrorHandler = () => {
  const error = useRouteError();
  return (
    <>
      <h1>{error.message}</h1>
      <Link to={"/question"}>Go back </Link>
    </>
  );
};

export default ErrorHandler;
