import React, { useState } from "react";

const data = [
  {
    title: "React",
    content:
      "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage state effectively.",
  },
  {
    title: "Spring Boot",
    content:
      "Spring Boot is an open-source Java-based framework used to create stand-alone, production-grade Spring-based applications with minimal configuration.",
  },
  {
    title: "Node.js",
    content:
      "Node.js is a runtime environment that allows you to run JavaScript on the server side. It is designed to build scalable network applications.",
  },
  {
    title: "MongoDB",
    content:
      "MongoDB is a NoSQL database that stores data in JSON-like documents, allowing for flexible and scalable schema design.",
  },
  {
    title: "Docker",
    content:
      "Docker is a platform for developing, shipping, and running applications in containers. It simplifies application deployment and scalability.",
  },
  {
    title: "Kubernetes",
    content:
      "Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.",
  },
  {
    title: "Swelte",
    content: "",
  },
];
const Accordian = () => {
  const [open, setOpen] = useState(null);
  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };
  return (
    <div>
        <h1 style={{textAlign:"center"}}>Accordian App</h1>
      {data?.map((item, index) => {
        return (
          <div className="main">
            <div className="item" onClick={() => handleOpen(index)}>
              <strong>{item?.title}</strong>
              <div className='btn' style={{ transform: `rotate(${index === open ? 0 : 180}deg)` }}>^</div>
            </div>
            {open === index && <div className="itemContent">{item.content ? item?.content : "No item available"}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
