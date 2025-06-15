import React, { useEffect, useState } from "react";
import Products from "./Products";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(5);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=200");
        const json = await res.json();
        setData(json.products);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    getProducts();
  }, []);

  useEffect(()=>{
    setPage(1);
  },[countPerPage])

  const totalPages = Math.ceil(data.length / countPerPage);
  const startIndex = (page - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <>
      <h1>Products Page</h1>
      <div className="product-grid">
        {data
          ?.slice((page - 1) * countPerPage, (page - 1) * countPerPage + countPerPage)
          .map((product) => (
            <Products title={product?.title} image={product?.images} />
          ))}
      </div>
      <div className="pageBtn">
        <button disabled={page==1} onClick={() => setPage(page-1)}>Prev</button>
        <div>
          <label>Showing:&nbsp;</label>
          <select value={countPerPage} onChange={(e) => {
            setCountPerPage(Number(e.target.value));
            // setPage(1); // Reset to first page when per page count changes
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span> &nbsp;of {data.length} products</span>
        </div>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page == Math.ceil(data.length/countPerPage)} onClick={() => setPage(page+1)}>Next</button>
      </div>
    </>
  );
};

export default Pagination;
