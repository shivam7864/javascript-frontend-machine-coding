import React from 'react'

const Light = ({color, activeColor}) => {
  const opacity = color === activeColor ? 1 : 0.2;
  return <div style={{ backgroundColor: color, opacity }} className="light" />;
}

export default Light
