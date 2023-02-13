import { useNavigation, Navigate } from "react-router-dom";
import { context } from "../../context/Context";
import { useContext } from "react";
import Loader from "../../components/Loader";

const LogOut = () => {
  if (useNavigation().state === "loading") return <Loader />;
  const { logOut } = useContext(context);

  logOut();
  return <Navigate to="/" />;
};

export default LogOut;
