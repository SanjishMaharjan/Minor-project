import { Outlet } from "react-router-dom";
import useAuth from "../context/AuthContext";

import Handle404 from "../pages/Error/Handle404";

const RequireAdmin = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Handle404 />;
};

export default RequireAdmin;
