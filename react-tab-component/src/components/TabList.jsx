import React from "react";
import Tab from "./Tab";

const TabList = () => {
  const tabsList = [
    {
      id: "a",
      label: "Component A",
      Component: ComponentA,
    },
    {
      id: "b",
      label: "Component B",
      Component: ComponentB,
    },

    {
      id: "c",
      label: "Component C",
      Component: ComponentC,
    },

    {
      id: "d",
      label: "Component D",
      Component: ComponentD,
    },
  ];

  return (
    <div>
      <Tab tabs={tabsList} />
    </div>
  );
};
function ComponentA() {
  return <h1>Component A</h1>;
}

function ComponentB() {
  return <h1>Component B</h1>;
}

function ComponentC() {
  return <h1>Component C</h1>;
}

function ComponentD() {
  return <h1>Component D</h1>;
}

export default TabList;
