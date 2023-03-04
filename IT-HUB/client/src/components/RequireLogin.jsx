import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/AuthContext";
import Handle404 from "../pages/Error/Handle404";

const RequireLogin = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? <Outlet /> : null;
};

export default RequireLogin;
