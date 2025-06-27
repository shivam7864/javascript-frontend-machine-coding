import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Star from "./components/Star";

function App() {
  const handleChange = (value) =>{
    console.log(value);
    
  }

  return (
    <>
      <Star value={0} onChange = {handleChange}/>
    </>
  );
}

export default App;
