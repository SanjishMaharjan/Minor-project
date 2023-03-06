import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/AuthContext";
import NotLoggedIn from "../pages/Error/NotLoggedIn";

const RequireLogin = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? <Outlet /> : <NotLoggedIn />;
};

export default RequireLogin;
