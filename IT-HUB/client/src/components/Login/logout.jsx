import { redirect, Navigate } from "react-router-dom";
import { context } from "../../Context";
import { useContext } from "react";
import axios from "axios";

export const logOut = async () => {
  // const { logOut } = useContext(context);

  // logOut();
  const res = await axios.get("http://localhost:5000/api/users/logout");

  return redirect("/");
};
