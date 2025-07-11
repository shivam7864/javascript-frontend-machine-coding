import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const pathnames = pathname.split("/").filter((x) => x);
  console.log(pathnames);

  const fetchDetails = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${pathnames[1]}`
    );
    const data = await response.json();
    setTitle(data.title);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        console.log(pathnames, breadcrumbPath);

        return isLast ? (
          <span key={breadcrumbPath}> / {title}</span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            / <Link to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  )
};

export default Breadcrumbs;
