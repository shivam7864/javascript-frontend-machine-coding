import React, { useState } from "react";
import CheckBox from "./CheckBox";

const nestedCheckboxData = [
  {
    id: "web_developer",
    label: "Web Development",
    checked: false,
    children: [
      {
        id: "frontend",
        label: "Frontend",
        checked: false,
        children: [
          {
            id: "react",
            label: "React",
            checked: false,
            children: [
              {
                id: "hooks",
                label: "React Hooks",
                checked: false,
                children: [
                  {
                    id: "custome",
                    label: "Custom React Hook",
                    checked: false,
                    children: [],
                  },
                ],
              },
              {
                id: "router",
                label: "React Router",
                checked: false,
                children: [],
              },
            ],
          },
          {
            id: "vue",
            label: "Vue",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        checked: false,
        children: [
          {
            id: "node",
            label: "Node.js",
            checked: false,
            // children: [],
            children: [
              {
                id: "security",
                label: "Spring Security",
                checked: false,
                children: [],
              },
              {
                id: "jpa",
                label: "JPA",
                checked: false,
                children: [],
              },
            ],
          },
          {
            id: "spring",
            label: "Spring Boot",
            checked: false,
            children: [],
          },
        ],
      },
      {
        id: "devops",
        label: "DevOps",
        checked: false,
        children: [
          {
            id: "docker",
            label: "Docker",
            checked: false,
            children: [],
          },
          {
            id: "kubernetes",
            label: "Kubernetes",
            checked: false,
            children: [],
          },
        ],
      },
    ],
  },
];
const BoxComp = () => {
  const [checkedData, setCheckedData] = useState({});

  const handleChange = (isChecked, node) => {
    setCheckedData((prev) => {
      const newState = { ...prev, [node?.id]: isChecked };

      const checkChildren = (node) => {
        node?.children?.map((child) => {
          newState[child?.id] = isChecked;
          child?.children?.length && checkChildren(child);
        });
      };
      checkChildren(node);

      const verifyCheck = (node) => {
        if (node?.children?.length === 0) return newState[node?.id] || false;
        const allChildrenChecked = node?.children?.every((child) => {
          return verifyCheck(child);
        });
        newState[node?.id] = allChildrenChecked;
        return allChildrenChecked;
      };

      nestedCheckboxData?.map((node) => verifyCheck(node));
    //   If we use curly bracket then we need to use the return keyword

    //   const verifyChec = (obj) => {
    //     if (obj?.children?.length === 0) {
    //       return newState[obj?.id] || false;
    //     }
    //     const check = obj.children.every((item) => verifyCheck(item));
    //     newState[obj?.id] = check;
    //     return check;
    //   };

    //   nestedCheckboxData?.map((item) => verifyCheck(item));

      return newState;
    });
  };
  console.log(checkedData);

  return (
    <div>
      <CheckBox
        obj={nestedCheckboxData}
        level={0}
        checkedData={checkedData}
        setCheckedData={setCheckedData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default BoxComp;
