import React from "react";
import Child from "./Child";

const Parent = ({ themeMode, setThemeMode, ThemeMode }) => {
  return (
    <div>
      <Child
        themeMode={themeMode}
        ThemeMode={ThemeMode}
        setThemeMode={setThemeMode}
      />
    </div>
  );
};

export default Parent;
