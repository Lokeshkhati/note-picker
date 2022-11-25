import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext)
export { useTheme, ThemeProvider };
