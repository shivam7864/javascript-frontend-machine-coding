import React, { useState } from "react";
import Chips from "./Chips";

const InputBox = () => {
  const [chipList, setChipList] = useState([]);
  const [chip, setChip] = useState();

  const handleAddChip = (e) => {
    if (chip == "") return;
    setChip(chip?.trim());
    if (e.key === "Enter") {
      setChipList((prev) => {
        return [...prev, e.target.value];
      });
      setChip("");
    }
  };

  const handleDelete = (i) => {
    const newArr = [];
    chipList?.map((chip, id) => {
      if (id !== i) newArr.push(chip);
    });
    setChipList(newArr);
  };

  console.log(chipList);

  return (
    <div className="container">
      <div className="container">
        <h1>Chips Input</h1>
        <input
          className="input-box"
          type="text"
          name="input"
          onChange={(e) => setChip(e.target.value)}
          onKeyDown={(e) => handleAddChip(e)}
          value={chip}
        />

        <div className="chip-list">
          {chipList?.map((chip, id) => {
            return (
              <Chips chipIdx={id} chip={chip} handleDelete={handleDelete} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InputBox;
