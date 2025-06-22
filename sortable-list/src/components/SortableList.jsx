import React, { useState } from "react";

const SortableList = () => {
  const dataArray = Array.from({ length: 100 }, (_, i) => i + 1);
  const [data, setData] = useState(dataArray);
  const [startIndex, setStartIndex] = useState(-1);
  const [swapIndex, setSwapIndex] = useState(-1);
  const [dragPosition, setDragPosition] = useState("top");

  const handleReset = () => {
    setStartIndex(-1);
    setSwapIndex(-1);
  };

  const handleDragStart = (e, idx) => {
    setStartIndex(idx);
    const original = e.currentTarget;

    //clone the original image
    const dragImage = original.cloneNode(true);
    dragImage.style.position = "absolute";
    dragImage.style.pointerEvents = "none";
    dragImage.style.opacity = "0.8";
    dragImage.style.transform = "scale(1.2)";
    dragImage.style.backgroundColor = "red";
    dragImage.style.width = "200px";

    dragImage.style.top = "-1000px";
    dragImage.style.left = "-1000px";

    //append to the body
    document.body.appendChild(dragImage);

    //set as frag image (0,0) is thee coordinates where the  pointer is  placed
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    e.dataTransfer.effectAllowed = "link";
    //remove it after the drag starts
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const swapArrayElements = (arr, startIndex, swapIndex) => {
    if (
      startIndex > arr.length ||
      swapIndex > arr.length ||
      startIndex < 0 ||
      swapIndex < 0
    )
      return arr;
    const newArr = [...arr];
    const [element] = newArr.splice(startIndex, 1);
    newArr.splice(swapIndex, 0, element);
    return newArr;
  };
  return (
    <div className="box">
      <div className="sortable-list-x">
        {data.map((list, idx) => {
          let cls = "row-x";
          if (idx === startIndex) {
            cls += " grabbing";
          }
          if (idx === swapIndex) {
            cls += ` draggable-${dragPosition}`;
          }
          return (
            <div
              key={idx}
              className={cls}
              draggable={true}
              onDragEnd={() => handleReset()}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => {
                e.preventDefault();
                const rect = e.currentTarget.getBoundingClientRect();
                const midPoint = rect.top + rect.height / 2;
                if (e.clientY < midPoint) {
                  setDragPosition("top");
                } else {
                  setDragPosition("bottom");
                }

                setSwapIndex(idx);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const newArray = [...data];
                const factor = dragPosition === "top" ? 0 : 1;
                let dropIdx = swapIndex + factor;
                if (startIndex < dropIdx) dropIdx--;
                setData(swapArrayElements(newArray, startIndex, dropIdx));
                handleReset();
              }}
            >
              {list}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SortableList;
