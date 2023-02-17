import { useState, createContext, useEffect, useContext } from "react";

const context = createContext(null);

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark-theme");
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <context.Provider value={{ toggleTheme, theme }}>{props.children}</context.Provider>;
};

const useToggleTheme = () => {
  return useContext(context);
};

export default useToggleTheme;
