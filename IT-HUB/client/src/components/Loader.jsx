import HashLoader from "react-spinners/HashLoader";
import "./loader.scss";
const Loader = () => {
  return (
    <>
      <div className="loader">
        <HashLoader color="#36d7b7" />
      </div>
    </>
  );
};

export default Loader;
