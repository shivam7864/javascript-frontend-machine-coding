// ThemeContext.js
import { createContext, useContext, useEffect, useState } from "react";

//created this because earlier whole all component were rerendered

// Theme mode constants
export const ThemeMode = {
  Light: 1,
  Dark: 2,
};

export const ThemeClass = {
  [ThemeMode.Light]: "light",
  [ThemeMode.Dark]: "dark",
};

// Create the context
const ThemeContext = createContext();

// Custom hook to consume the context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(ThemeMode.Dark);

  const handleToggle = () => {
    const newThemeMode =
      themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    setThemeMode(newThemeMode);

    const removeClassName = ThemeClass[themeMode];
    addThemeClass(ThemeClass[newThemeMode], removeClassName);
  };

  const addThemeClass = (className, removeClassName) => {
    const body = document.body;
    removeThemeClass(removeClassName, body);
    body.classList.add(className);
  };

  const removeThemeClass = (className, body) => {
    if (!className) return;
    body.classList.remove(className);
  };

  useEffect(() => {
    // Initial theme class addition
    addThemeClass(ThemeClass[themeMode], "");
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, handleToggle, ThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
