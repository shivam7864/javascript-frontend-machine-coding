import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Switch from "./components/Switch";

function App() {
  const [isOn, setIsOn] = useState(false);
  const onToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Switch isOn={isOn} onToggle={onToggle} label="Learning React" />
    </>
  );
}

export default App;
