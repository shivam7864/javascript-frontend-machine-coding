import React, { useEffect, useState } from "react";
import Products from "./Products";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [activePage, setActivePage] = useState(page);
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

  useEffect(() => {
    setPage(1);
  }, [countPerPage]);

  const totalPages = Math.ceil(data.length / countPerPage);
  const startIndex = (page - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Products Page</h1>
      <div className="pageBtn">
        <button
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
          style={{ cursor: page == 1 ? "not-allowed" : "pointer" }}
        >
          Prev
        </button>
        {(() => {
          const btns = [];
          for (let i = 0; i < totalPages; i++) {
            btns.push(
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "active" : ""}
                //   textColor = {page === i + 1 ? 'red' : ''}
              >
                {i + 1}
              </button>
            );
          }
          return btns;
        })()}

        <button
          disabled={page == Math.ceil(data.length / countPerPage)}
          onClick={() => setPage(page + 1)}
          style={{
            cursor:
              page == Math.ceil(data.length / countPerPage)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>

      <div className="pageBtn">
        <button
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
          style={{ cursor: page == 1 ? "not-allowed" : "pointer" }}
        >
          Prev
        </button>
        {(() => {
          const btns = [];

          for (let i = 1; i <= totalPages; i++) {
            if (
              i === 1 || // always show first
              i === totalPages || // always show last
              (i >= page - 2 && i <= page + 2) // show near current page
            ) {
              btns.push(
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={page === i ? "active" : ""}
                >
                  {i}
                </button>
              );
            } else if (
              i === page - 3 ||
              i === page + 3 // add ellipsis near gaps
            ) {
              btns.push(<span key={i}>...</span>);
            }
          }
          return btns;
        })()}

        <button
          disabled={page == Math.ceil(data.length / countPerPage)}
          onClick={() => setPage(page + 1)}
          style={{
            cursor:
              page == Math.ceil(data.length / countPerPage)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>

      <div className="product-grid">
        {data
          ?.slice(
            (page - 1) * countPerPage,
            (page - 1) * countPerPage + countPerPage
          )
          .map((product) => (
            <Products title={product?.title} image={product?.images} />
          ))}
      </div>
      <div className="pageBtn">
        <button
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
          style={{ cursor: page == 1 ? "not-allowed" : "pointer" }}
        >
          Prev
        </button>
        <div>
          <label>Showing:&nbsp;</label>
          <select
            value={countPerPage}
            onChange={(e) => {
              setCountPerPage(Number(e.target.value));
              // setPage(1); // Reset to first page when per page count changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span> &nbsp;of {data.length} products</span>
        </div>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page == Math.ceil(data.length / countPerPage)}
          onClick={() => setPage(page + 1)}
          style={{
            cursor:
              page == Math.ceil(data.length / countPerPage)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
