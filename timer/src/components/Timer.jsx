import React, { useEffect, useRef, useState } from "react";

const TimeFactors = {
  Hour: "hh",
  Minute: "mm",
  Second: "ss",
  MilliSeconds: "ms",
};

const Config = {
  [TimeFactors.Hour]: {
    value: "",
    factor: 60 * 60 * 1000,
    placeholder: "HH",
  },
  [TimeFactors.Minute]: {
    value: "",
    factor: 60 * 1000,
    placeholder: "MM",
  },
  [TimeFactors.Second]: {
    value: "",
    factor: 1000,
    placeholder: "SS",
  },
  [TimeFactors.MilliSeconds]: {
    value: "",
    factor: 1,
    placeholder: "MS",
  },
};

const OrderOfTime = [
  TimeFactors.Hour,
  TimeFactors.Minute,
  TimeFactors.Second,
  //   TimeFactors.MilliSeconds,
];

const Timer = () => {
  const [config, setConfig] = useState(structuredClone(Config));
  const [time, setTime] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);
  const timeSpentRef = useRef(0);
  const resumeRef = useRef(false);
  const remainingTimeRef = useRef(0);

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
    if (resumeRef.current && remainingTimeRef.current > 0) {
      resumeRef.current = false;
      resumeTimer(remainingTimeRef.current);
    }
  };

  const handleChange = (key, index) => {
    if (intervalRef.current) return;
    return (e) => {
      const newConfig = structuredClone(config);
      newConfig[key].value = e.target.value;
      setConfig(newConfig);
    };
  };

  const formatTime = () => {
    const hours = Math.floor(time / (1000 * 3600))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const resumeTimer = (duration) => {
    timeSpentRef.current = Date.now() + duration;
    intervalRef.current = setInterval(() => {
      const timeLeft = timeSpentRef.current - Date.now();
      if (timeLeft <= 0) {
        setTimerEnded(true);
        clearInterval(intervalRef.current);
        setTime(0);
      } else {
        setTime(timeLeft);
      }
    }, 10);
  };

  const handleStart = () => {
    if (intervalRef.current) return;

    if (isPaused && remainingTimeRef.current) {
      console.log(remainingTimeRef.current);

      resumeTimer(remainingTimeRef.current);
      setIsPaused(false);
      return;
    }
    let totalTimeInMilliSeconds = 0;
    OrderOfTime.forEach((key) => {
      const data = config[key];
      const value = data.value;
      const factor = data.factor;

      if (value && !isNaN(value)) {
        totalTimeInMilliSeconds += Number(value) * factor;
      }
    });
    timeSpentRef.current = Date.now() + totalTimeInMilliSeconds;
    resumeTimer(totalTimeInMilliSeconds);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    remainingTimeRef.current = timeSpentRef.current - Date.now();
    setIsPaused(true);
  };

  const handleReset = () => {
    setTime(0);
    timeSpentRef.current = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setConfig(structuredClone(Config));
  };

  const startAgain = () => {
    setTimerEnded(false);
    handleReset();
  };

  if (timerEnded) {
    return (
      <>
        <h1>Congratulations</h1>
        <button onClick={startAgain}>Start Again</button>
      </>
    );
  }

  return (
    <div className="timer">
      <h1>Timer</h1>
      <div className="text-fields">
        {OrderOfTime.map((orderKey, index) => {
          const data = config[orderKey];
          return (
            <div key={index}>
              <input
                type="number"
                placeholder={data.placeholder}
                value={data.value}
                onChange={handleChange(orderKey, index)}
                list={`${orderKey}-datalist`}
              />
              <datalist id={`${orderKey}-datalist`}>
                <option value="5" />
                <option value="15" />
                <option value="25" />
                <option value="35" />
                <option value="45" />
              </datalist>
            </div>
          );
        })}
      </div>
      <span className="time">{formatTime()}</span>
      <div className="buttons">
        <button className="btn" onClick={handleStart}>
          &#x23F5; Play
        </button>
        <button className="btn" onClick={handlePause}>
          &#x23F8; Pause
        </button>
        <button className="btn" onClick={handleReset}>
          &#x23FB; Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
