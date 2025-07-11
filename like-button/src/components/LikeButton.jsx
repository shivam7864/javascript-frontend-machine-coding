import React, { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icon";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const handleLike = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: isLiked ? "unlike" : "like",
          }),
        },
      );
      if (response.status >= 200 && response.status < 300) {
        setIsLiked(!isLiked);
        setIsFetching(false);
      } else {
        const res = await response.json();
        setError(res.message);
        setIsFetching(false);
        return;
      }
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div>
      <button className={isLiked ? "liked" : ""} onClick={handleLike}>
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}{" "}
        {isLiked ? "Liked" : "Like"}
      </button>
      {error && !isFetching && (
        <div>
            {error}
        </div>
      )}
    </div>
  );
};

export default LikeButton;
