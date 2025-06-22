import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SortableList from "./components/SortableList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SortableList />
    </>
  );
}

export default App;
