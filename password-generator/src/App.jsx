import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PasswordGenerator />
    </>
  );
}

export default App;
