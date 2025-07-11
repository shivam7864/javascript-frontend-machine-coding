import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LikeButton from "./components/LikeButton";
// import LikeButton from "./components/LikeButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LikeButton />
    </>
  );
}

export default App;
