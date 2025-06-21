import React from "react";

const Modal = ({ title, setOpen, component }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{component}</p>
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
};

export default Modal;
