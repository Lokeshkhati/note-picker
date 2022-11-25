import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const ThemeContext = createContext("dark");

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext)
export { useTheme, ThemeProvider };
