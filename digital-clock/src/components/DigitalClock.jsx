import React, { useEffect, useState } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
    
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div style={styles.clock}>
      {formatTime(time.getHours())}:
      {formatTime(time.getMinutes())}:
      {formatTime(time.getSeconds())}
    </div>
  );
};

// Optional styling
const styles = {
  clock: {
    fontSize: "48px",
    // fontFamily: "monospace",
    color: "#0ff",
    backgroundColor: "#000",
    padding: "20px",
    borderRadius: "10px",
    display: "inline-block",
  },
};

export default DigitalClock;
