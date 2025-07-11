import React, { useEffect, useState } from "react";
import JobList from "./JobList";

const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";
const JobBoard = () => {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchJobDetails = async (currentPage) => {
    setCurrentPage(currentPage);
    setFetchingDetails(true);

    let itemsList = itemIds;
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
    }

    const itemIdsForPage = itemsList.slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response) =>
          response.json()
        )
      )
    );
    setItems([...items, ...itemsForPage]);
    setFetchingDetails(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchJobDetails(currentPage);
  }, [currentPage]);

  return (
    <div className="custom-app">
      <h1 className="custom-title">Hacker News Jobs Board</h1>
      {itemIds === null || items.length < 1 ? (
        <p className="custom-loading">Loading...</p>
      ) : (
        <div>
          <div className="custom-items" role="list">
            {items.map((item) => (
              <JobList key={item?.id} {...item} />
            ))}
          </div>
          {items.length > 0 &&
            currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE < itemIds.length && (
              <button
                className={`custom-load-more-button`}
                disabled={fetchingDetails}
                onClick={() => fetchJobDetails(currentPage + 1)}
              >
                {fetchingDetails ? "loading..." : "Load more jobs"}
              </button>
            )}
        </div>
      )}
    </div>
  );
};

export default JobBoard;
