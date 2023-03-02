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
    } catch (error) {
      setLoggedIn(false);
      setUser({});
      setAdmin(false);
    }
  };

  const logOut = async () => {
    await axios.get("/api/users/logout");
    setLoggedIn(false);
    setUser({});
    setAdmin(false);
    client.invalidateQueries(["user"]);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <context.Provider value={{ isLoggedIn, setLoggedIn, logOut, user, setUser, isAdmin, setAdmin }}>
      {props.children}
    </context.Provider>
  );
};

const useAuth = () => {
  return useContext(context);
};

export default useAuth;
