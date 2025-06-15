import React from "react";

const Interest = ({ values, handleChange }) => {
  return (
    <div>
      <h4>Interest</h4>
      <div className="form-container">
        <div className="checkbox">
          <label for="cricket">Cricket</label>
          <input
            className="input-box"
            checked={values?.cricket}
            type="checkbox"
            id="cricket"
            onChange={(e) => handleChange(!values?.cricket, "cricket")}
          />
        </div>
        <div className="checkbox">
          <label for="badminton">Badminton</label>
          <input
            className="input-box"
            checked={values?.badminton}
            type="checkbox"
            id="badminton"
            onChange={(e) => handleChange(!values?.badminton, "badminton")}
          />
        </div>
        <div className="checkbox">
          <label for="coding">Coding</label>
          <input
            className="input-box"
            checked={values?.coding}
            type="checkbox"
            id="coding"
            onChange={(e) => handleChange(!values?.coding, "coding")}
          />
        </div>
        <div className="checkbox">
          <label for="vollyball">Vollyball</label>
          <input
            className="input-box"
            checked={values?.vollyball}
            type="checkbox"
            id="vollyball"
            onChange={(e) => handleChange(!values?.vollyball, "vollyball")}
          />
        </div>
      </div>
    </div>
  );
};

export default Interest;
