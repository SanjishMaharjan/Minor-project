import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const context = createContext(null);

export const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [user, setUser] = useState({});

  const checkLogin = async () => {
    const res = await axios.get("http://localhost:5000/api/users/loggedin");
    setLoggedIn(res.data);
    if (res.data) {
      const user = await axios.get("http://localhost:5000/api/users/getuser");
      // console.log(user);
      setUser(user.data);
    }
  };

  const logOut = async () => {
    const res = await axios.get("http://localhost:5000/api/users/logout");
    setLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  return (
    <context.Provider value={{ isLoggedIn, setLoggedIn, logOut, user, setUser, isAdmin, setAdmin }}>
      {props.children}
    </context.Provider>
  );
};
