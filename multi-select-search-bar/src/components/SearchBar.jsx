import React, { useEffect, useRef, useState } from "react";
import Pill from "./Pill";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const inputRef = useRef();
  const fetchData = async () => {
    if (searchTerm.length == 0) return;
    const response = await fetch(
      `https://dummyjson.com/users/search?q=${searchTerm}`
    );
    const data = await response.json();
    setSuggestion(data.users);
  };
  
 useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeOut);
  }, [searchTerm]);


  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestion([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user)=>{
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  }

  const handleKeyDown = (e) =>{
 if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestion([]);
    }else if (e.key === "ArrowDown" && suggestion?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestion.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestion?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestion.length
    ) {
      handleUserSelect(suggestion[activeSuggestion]);
    }
  }

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* Pills */}
        {selectedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        {/* input feild with search suggestions */}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search For a User..."
            onKeyDown={handleKeyDown}
          />
          {/* Search Suggestions */}
          <ul className="suggestions-list">
            {suggestion?.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li
                    className={index === activeSuggestion ? "active" : ""}
                  key={user.email}
                  onClick={() => handleUserSelect(user)}
                >
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
