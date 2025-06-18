import React from "react";

const CheckBox = ({
  obj,
  level = 0,
  checkedData,
  setCheckedData,
  handleChange,
}) => {
  return (
    <div>
      {obj.map((item) => (
        <div
          key={item?.id}
          style={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            paddingLeft: "15px",
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={checkedData[item?.id] || false}
              onChange={(e) => handleChange(e.target.checked, item)}
            />
            <span>{item?.label}</span>
          </div>
          {item.children?.length > 0 && (
            <CheckBox
              obj={item?.children}
              level={level + 1}
              checkedData={checkedData}
              setCheckedData={setCheckedData}
              handleChange={handleChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
