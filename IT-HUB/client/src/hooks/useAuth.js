import { useContext } from "react";
import { context } from "../context/AuthContext";

const useAuth = () => {
  return useContext(context);
};

export default useAuth;
