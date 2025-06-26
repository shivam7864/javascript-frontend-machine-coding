import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GridLight from "./components/GridLight";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GridLight />
    </>
  );
}

export default App;
