import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [lapList, setLapList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const startedSinceRef = useRef(0);
  const intervalRef = useRef(null);
  const resumeRef = useRef(false);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [time]);

  const handleBlur = () => {
    resumeRef.current = !!intervalRef.current;
    handlePause();
  };

  const handleFocus = () => {
    if (resumeRef.current) {
      resumeRef.current = false;
      handleStart();
    }
  };
  const handleStart = () => {
    if (intervalRef.current) {
      return;
    }
    setIsRunning(true);
    startedSinceRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startedSinceRef.current);
    }, 10);
    console.log("Start", intervalRef.current);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    startedSinceRef.current = 0;
    intervalRef.current = null;
    setLapList([]);
    console.log("Reset", intervalRef.current);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    console.log("Pause", intervalRef.current);
  };

  const handleAddLap = () => {
    if (time === 0 || !intervalRef.current) return; //don't allow to add lap when timer is  not yet started or is paused
    // const lapTime = formatTime();
    setLapList((prev) => [...prev, time]);
  };

  const formatTime = (time) => {
    const milliSeconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(time / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
  };

  return (
    <>
      <div className="stopwatch">
        <h1>Stopwatch</h1>
        <span className="time">{formatTime(time)}</span>
        <button className="btn" onClick={() => handleStart()}>
          Start
        </button>
        <button className="btn" onClick={() => handlePause()}>
          Pause
        </button>
        <button className="btn" onClick={() => handleReset()}>
          Reset
        </button>
        <button
          className="btn"
          onClick={() => handleAddLap()}
          disabled={time === 0 || !isRunning}
        >
          Lap
        </button>
      </div>
      <div className="lap">
        <h2> Lap List</h2>
        <div>
          <ul>
            {lapList.map((lap, index) => {
              const lapTime = formatTime(lap);
              const diff = index === 0 ? lap : lap - lapList[index - 1];
              const diffTime = formatTime(diff);
              return (
                <li key={index}>
                  Lap {index + 1}: {lapTime} (+{diffTime})
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stopwatch;
