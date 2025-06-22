import React, { useEffect, useState } from "react";
import axios from "axios";

const InfiniteProducts = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const THRESHOLD = 100;

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + limit);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingHeight < THRESHOLD && !loading) {
      fetchProducts();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: "80vh",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {products?.map((product) => (
          <div
            key={product.id}
            style={{ border: "1px solid #eee", padding: "10px" }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                borderRadius: "5px",
                objectFit: "cover",
                height: "150px",
              }}
            />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {loading && (
        <p style={{ textAlign: "center" }}>Loading more products...</p>
      )}
    </div>
  );
};

export default InfiniteProducts;
