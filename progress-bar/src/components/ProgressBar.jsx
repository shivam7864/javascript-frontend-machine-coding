import React, { useState } from "react";

const ProgressBar = () => {
  const [status, setStatus] = useState(0);

  const handleBarStatus = (val) => {
    setStatus((prev) => prev + val);
  };

  return (
    <div className="main">
      <h2>Progress Bar</h2>
      <div className="container">
        <div
          className="bar"
          style={{
            width: `${status * 4}px`,
            // transform:`trasnslateX(-25%)`, // this could alse be used
            backgroundColor: `${
              status < 40 ? "red" : status < 80 ? "orange" : "green"
            }`,
          }}
        >
          {status}
        </div>
      </div>

      <div>
        <button disabled={status === 0} onClick={() => handleBarStatus(-10)}>
          -10
        </button>
        <button disabled={status === 100} onClick={() => handleBarStatus(10)}>
          +10
        </button>
      </div>
      <hr></hr>
    </div>
  );
};

export default ProgressBar;
