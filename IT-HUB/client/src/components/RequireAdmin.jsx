import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireLogin = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  return isAdmin ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireLogin;
