import { useNavigation, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";
import { queryClient } from "../../api/queryClient";

const LogOut = () => {
  if (useNavigation().state === "loading") return <Loader />;
  const { logOut } = useAuth();

  logOut();
  queryClient.invalidateQueries(["user"]);
  return <Navigate to="/" />;
};

export default LogOut;
