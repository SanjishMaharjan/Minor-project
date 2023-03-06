import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import { client } from "../Api/queryClient";

const context = createContext(null);

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [user, setUser] = useState({});

  const checkLogin = async () => {
    try {
      const user = await axios.get("/api/users/getuser");
      client.setQueryData(["user"], user.data, { staleTime: Infinity });
      setUser(user.data);
      setLoggedIn(true);
      setAdmin(user.data.isAdmin);
    } catch (error) {}
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const login = async (res) => {
    client.setQueryData(["user"], res.data, { staleTime: Infinity });
    setUser(res.data);
    setLoggedIn(true);
    setAdmin(res.data.isAdmin);
  };

  const logOut = async () => {
    await axios.get("/api/users/logout");
    client.invalidateQueries(["user"]);
    client.invalidateQueries(["notificationCount"]);
    setUser({});
    setLoggedIn(false);
    setAdmin(false);
  };

  return (
    <context.Provider
      value={{ isLoggedIn, setLoggedIn, user, setUser, isAdmin, setAdmin, login, logOut }}
    >
      {props.children}
    </context.Provider>
  );
};

const useAuth = () => {
  return useContext(context);
};

export default useAuth;
