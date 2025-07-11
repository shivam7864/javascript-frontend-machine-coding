import React, { useRef } from 'react'

const Note = ({note,initialPos,...props}) => {
  
  return (
    <div  
    style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "200px",
        cursor: "move",
        backgroundColor: "lightyellow",
      }}
      {...props}
      >
     📌 {note}
    </div>
  )
}

export default Note
