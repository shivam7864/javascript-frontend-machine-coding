import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JobBoard from "./components/JobBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <JobBoard />
    </>
  );
}

export default App;
