import React, { useEffect, useState } from "react";
import "./style.css";
import Light from "./Light";

const TrafficLight = ({ data }) => {
  const getSortedLightOrder = (randomOrder) => {
    return randomOrder.toSorted(function (a, b) {
      return a.order - b.order;
    });
  };

  const getSortedDisplayOrder = (randomOrder) => {
    return randomOrder.toSorted(function (a, b) {
      return a.displayOrder - b.displayOrder;
    });
  };

  const dataToShow = getSortedDisplayOrder(data);
  const dataInOrder = getSortedLightOrder(data);

  const [lightsInDisplayOrder, setLightsInDisplayOrder] = useState(dataToShow);
  const [lightsInOrder, setLightInOrder] = useState(dataInOrder);

  const [activeLight, setActiveLight] = useState(dataInOrder[0]);
  useEffect(() => {
    setTimeout(() => {
      const currentLightIndex = lightsInOrder.findIndex(
        (l) => l.color === activeLight.color
      );
      const nextLightIndex = currentLightIndex + 1;

      const nextLight = lightsInOrder[nextLightIndex] ?? lightsInOrder[0];
      setActiveLight(nextLight);
    }, activeLight.time);
  }, [activeLight]);

  return (
    <div className="traffic-light">
      {lightsInDisplayOrder.map((light) => {
        return (
          <Light
            key={light.color}
            color={light.color}
            activeColor={activeLight.color}
          />
        );
      })}
    </div>
  );
};

export default TrafficLight;
