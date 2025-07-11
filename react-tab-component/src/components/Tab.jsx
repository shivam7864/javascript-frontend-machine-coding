import React, { useState } from "react";
import Button from "./Button";

const Tab = ({ tabs, defaultSelection = 1, onChange = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelection);
  const Component = tabs[selectedIndex].Component;

  const handleTabChange = (index) => {
    return () => {
      setSelectedIndex(index);
      onChange(index);
    };
  };
  return (
    <div role="tablist">
      {tabs.map((tab, index) => {
        return (
          <Button
            onClick={handleTabChange(index)}
            label={tab.label}
            key={tab.id}
            role="tab"
            aria-selected={index === selectedIndex}
            data-selected={index === selectedIndex}
          />
        );
      })}

      <div role="tabpanel">
        <Component />
      </div>
    </div>
  );
};

export default Tab;
