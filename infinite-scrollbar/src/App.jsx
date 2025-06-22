import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InfiniteScroll from "./components/InfiniteScroll";
import InfiniteProducts from "./components/InfiniteProducts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <InfiniteScroll /> */}
      <InfiniteProducts />
    </>
  );
}

export default App;
