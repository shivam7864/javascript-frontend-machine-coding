import React from "react";

const Chips = ({ chip, handleDelete, chipIdx }) => {
  return (
    <div className="chips">
      <div className="chip-item">
        {chip}
        <div className="delete-chip" onClick={() => handleDelete(chipIdx)}>
          X
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Chips;
