import React, { useState } from "react";
import StarSVG from "./StarSVG";

const NUMBER_OF_STARS = 5;

const Star = ({ value = 0, onChange, numberOfStars = NUMBER_OF_STARS }) => {
  const [clickedIndex, setClickedIndex] = useState(value - 1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleClick = (index) => {
    setClickedIndex(index);
    onChange(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(-1);
  };
  return (
    <div className="star-rating">
      {[...new Array(numberOfStars)].map((_, index) => {
        let className = "";
        if (index <= clickedIndex) {
          className = "active";
        }
        if (index <= hoveredIndex && hoveredIndex !== -1) {
          className += " hovered";
        }
        return (
          <button
            className={className}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <StarSVG key={index} />
          </button>
        );
      })}
    </div>
  );
};

export default Star;
