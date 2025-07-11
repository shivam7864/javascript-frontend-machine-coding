import React from "react";
import "./style.css";
const Circle = ({ x, y, color }) => {
  return (
    <div
      className="circle-comp"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color ?? "red",
      }}
    ></div>
  );
};

export default Circle;
