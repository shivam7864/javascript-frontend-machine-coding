import { createContext, useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GrandParent from "./components/GrandParent";
import { ThemeProvider } from "./components/ThemeManage";

function App() {

  return (
    <>
      <span>Hello</span>
      {/* <GrandParent
        ThemeMode={ThemeMode}
        themeMode={themeMode}
        setThemeMode={handleToggle}
      /> */}

      <ThemeProvider>
        <GrandParent />
      </ThemeProvider>
    </>
  );
}

export default App;
