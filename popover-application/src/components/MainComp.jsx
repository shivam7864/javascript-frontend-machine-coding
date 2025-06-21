import React, { useState } from "react";
import Modal from "./Modal";
import TestComp1 from "./Test";

const MainComp = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Open Modal</button>
      {open && (
        <Modal title="Open Modal" component={<TestComp1 />} setOpen={setOpen} />
      )}
    </div>
  );
};

export default MainComp;
