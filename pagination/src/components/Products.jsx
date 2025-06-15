import React from "react";

const Products = ({ image, title }) => {
  return (
    <div className="card-container">
      <div className="card">
        <img src={image} />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Products;
