import React from "react";
import Parent from "./Parent";

const GrandParent = ({ themeMode, setThemeMode, ThemeMode }) => {
  return (
    <div>
      <Parent
        themeMode={themeMode}
        ThemeMode={ThemeMode}
        setThemeMode={setThemeMode}
      />
    </div>
  );
};

export default GrandParent;
