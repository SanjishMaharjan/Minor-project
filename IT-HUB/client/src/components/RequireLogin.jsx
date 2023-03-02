import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/AuthContext";

const RequireLogin = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ prev: location.pathname }} replace />
  );
};

export default RequireLogin;
