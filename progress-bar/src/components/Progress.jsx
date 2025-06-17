import React from "react";
import ProgressBars from "./ProgressBars";
import ProgressBarByWidthPercent from "./ProgressBarByWidthPercent";
import ProgressBar from "./ProgressBar";

const Progress = () => {
  const progressChart = [0, 5, 10, 20, 35, 55, 70, 85, 100];
  return (
    <div>
      {progressChart.map((item) => (
        <ProgressBars progress={item} />
      ))}

      {progressChart.map((item) => (
        <ProgressBarByWidthPercent progress={item} />
      ))}

      <ProgressBar />
    </div>
  );
};

export default Progress;
