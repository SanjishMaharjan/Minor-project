import { useContext } from "react";
import { context } from "../context/Context";

const useAuth = () => {
  return useContext(context);
};

export default useAuth;
