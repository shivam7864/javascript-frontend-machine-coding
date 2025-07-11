import { useState } from "react";
import "./App.css";
import SelectableGrid from "./components/SelectableGrid";

function App() {
  return (
    <>
      <SelectableGrid rows={10} columns={10} />
    </>
  );
}

export default App;
