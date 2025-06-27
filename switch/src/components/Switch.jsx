import React from "react";

const Switch = ({ isOn, onToggle = () => {}, label = "" }) => {
  return (
    <div className="switch">
      <label>
        <input type="checkbox" role="switch" aria-checked={isOn} checked={isOn} onChange={onToggle} />
        <span className="slider"></span>
        <span className="switch-label">{label}</span>
      </label>
    </div>
  );
};

export default Switch;
