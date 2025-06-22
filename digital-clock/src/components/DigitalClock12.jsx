import React, { useEffect, useState } from "react";

const DigitalClock12 = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  };

  const formatDate = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${monthName} ${day}, ${year}`;
  };

  const pad = (num) => num.toString().padStart(2, '0');

  return (
    <div style={styles.container}>
      <div style={styles.time}>{formatTime(time)}</div>
      <div style={styles.date}>{formatDate(time)}</div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "monospace",
    backgroundColor: "#000",
    color: "#0ff",
    padding: "20px",
    borderRadius: "10px",
    display: "inline-block",
    boxShadow: "0 0 10px #0ff",

  },
  time: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  date: {
    fontSize: "20px",
  },
};

export default DigitalClock12;
