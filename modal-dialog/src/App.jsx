import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dialog from "./components/Dialog";

function App() {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowDialog = () =>{
    setShowDialog(!showDialog);
  }

  const handleCloseDialog = () =>{
    setShowDialog(false);
  }

  return (
    <>
      <button className="button" onClick={()=>handleShowDialog()}>Show Dialog</button>
      {
        showDialog && (
          <Dialog onClose ={handleCloseDialog}>
            <h1>Title</h1>
            <span>Some text</span>
            <button className="save-button">Save</button>
          </Dialog>
        )
      }
    </>
  );
}

export default App;
