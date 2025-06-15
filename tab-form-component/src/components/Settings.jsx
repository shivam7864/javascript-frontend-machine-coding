import React from "react";

const Settings = ({ values, handleChange, setValues, handleSubmitForm,handleReset }) => {
  return (
    <div>
      <h1>Settings</h1>
      <div className="form-container">
        <label htmlFor="settings">Do you love this project?</label>
        <select onChange={(e) => handleChange(e.target.value, "settings")}>
          <option value="">-- Select an option --</option>
          <option value="op1">Yes</option>
          <option value="op2">No</option>
        </select>
      </div>
      <button onClick={() => handleSubmitForm()}> Submit Data</button>
      <button
        onClick={() => {
          handleReset()
        }}
      >
        Reset Data
      </button>
    </div>
  );
};

export default Settings;
