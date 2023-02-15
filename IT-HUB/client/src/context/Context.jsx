import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const context = createContext(null);

export const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [user, setUser] = useState({});

  const checkLogin = async () => {
    const res = await axios.get("/api/users/loggedin");
    setLoggedIn(res.data);
    if (res.data) {
      const user = await axios.get("/api/users/getuser");
      setUser(user.data);
      setAdmin(user.data.isAdmin);
      console.log(user.data.isAdmin);
    }
  };

  const logOut = async () => {
    await axios.get("/api/users/logout");
    setLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn, isAdmin]);

  return (
    <context.Provider value={{ isLoggedIn, setLoggedIn, logOut, user, setUser, isAdmin, setAdmin }}>
      {props.children}
    </context.Provider>
  );
};
