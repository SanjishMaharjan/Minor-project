import { useNavigation, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";

const LogOut = () => {
  if (useNavigation().state === "loading") return <Loader />;
  const { logOut } = useAuth();

  logOut();
  return <Navigate to="/" />;
};

export default LogOut;
