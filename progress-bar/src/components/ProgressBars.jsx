import React, { useEffect, useState } from "react";

const ProgressBars = ({ progress }) => {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setStatus(progress);
    }, 250);
  }, [progress]);
  return (
    <div className="main" style={{ margin: "20px" }}>
      <div className="container">
        <div
          className="bar"
          style={{
            width: `${status * 4}px`,
            // transform:`translateX(${progress - 100}%)`,
            backgroundColor: `${
              status < 40 ? "red" : status < 80 ? "orange" : "green"
            }`,
          }}
        >
          {status}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBars;
