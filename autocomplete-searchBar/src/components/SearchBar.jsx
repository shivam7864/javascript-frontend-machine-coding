import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [cachedData, setCachedData] = useState({});

  const fetchData = async () => {
    if (cachedData[input]?.length > 0) {
      setSearchResult(cachedData[input]);
      console.log("cached data");

      return;
    }
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${input}`
    );
    const res = await response.json();
    console.log(res);

    setSearchResult(res?.recipes ?? []);
    if (input?.length > 0) {
      setCachedData((prev) => ({
        ...cachedData,
        [input]: res?.recipes,
      }));
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeOut);
  }, [input]);

  return (
    <div className="comp">
      <h1>AutoComplete SearchBar</h1>
      <div className="searchBar">
        <input
          type="text"
          onFocus={() => fetchData()}
          onBlur={() => setSearchResult([])}
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
          name="input"
          value={input}
          autoComplete="off"
        />
      </div>
      {searchResult?.length > 0 && (
        <div className="searchResult">
          {searchResult?.map((item) => (
            <div key={item?.name} className="searchItem">
              {item?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
