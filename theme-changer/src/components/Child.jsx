import React, { useContext } from "react";
import { useTheme } from "./ThemeManage";

// const Child = ({ themeMode, setThemeMode, ThemeMode, }) => {
const Child = ({}) => {
  const { themeMode, handleToggle, ThemeMode } = useTheme();
  const text = themeMode === ThemeMode.Dark ? "🌞" : "🌑";
  return (
    <div>
      <button onClick={handleToggle}>{text}</button>
    </div>
  );
};

export default Child;
