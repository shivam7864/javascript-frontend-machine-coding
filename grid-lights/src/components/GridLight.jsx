import React, { useState } from "react";

const config = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1],
];
const GridLight = () => {
  const [stack, setStack] = useState(new Map());
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = (row, col) => {
    const newStack = structuredClone(stack);
    const key = `${row}-${col}`;
    if (newStack.get(key) || !config[row][col]) {
      return;
    } else {
      newStack.set(key, true);
    }
    setStack(newStack);
    const lightSelected = config.flat().reduce((a, b) => {
      return a + b;
    }, 0);

    if (lightSelected === newStack.size) {
      startRollBack();
    }
  };

  const startRollBack = () => {
    setIsDisabled(true);
    const intervalId = setInterval(function () {
      setStack(function (prevStack) {
        const lastKey = Array.from(prevStack.keys()).pop();
        const newStack = structuredClone(prevStack);
        newStack.delete(lastKey);
        if (!newStack.size) {
          clearInterval(intervalId);
          setIsDisabled(false);
        }
        return newStack;
      });
    }, 1000);
  };

  return (
    <div className="grid-light">
      {config?.map((row, rowId) => {
        return (
          <div key={rowId} className="grid-row">
            {row?.map((col, colId) => {
              let lightClass = "";
              if (col === 0) lightClass = "off";
              const key = `${rowId}-${colId}`;
              if (stack.has(key)) {
                lightClass += " on";
              }
              return (
                <div
                  key={colId}
                  className={`light ${lightClass}`}
                  onClick={() => {
                    if (!isDisabled) handleClick(rowId, colId);
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GridLight;
