import React, { useState } from "react";
import Comment from "./Comment";
import useCommentTree from "../hooks/useCommentTree";

const NestedComments = ({
  comments = [],
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  // onUpvote = () => {},
  // onDownvote = () => {},
}) => {
  const [comment, setComment] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const {
    comments: commentsData,
    insertComment,
    editComment,
    likeComment,
    disLikeComment,
  } = useCommentTree(comments);

  const sortComments = (commentsData) => {
    const sorted = [...commentsData];

    switch (sortOption) {
      case "latest":
        return sorted.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
      case "most_votes":
        return sorted.sort((a, b) => b.votes - a.votes);
      default:
        return sorted;
    }
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };
  const handleDelete = (commentId) => {
    editComment(commentId);
    onDelete(commentId);
  };

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
    onSubmit(content);
  };

  const handleLike = (commentId) => {
    likeComment(commentId);
  };
  const handleDisLike = (commentId) => {
    disLikeComment(commentId);
  };
  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          name="comment"
          onChange={handleChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button className="comment-button" onClick={handleSubmit}>
          Add Comment
        </button>
      </div>
      <select
        onChange={(e) => setSortOption(e.target.value)}
        value={sortOption}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="most_votes">Most Votes</option>
      </select>
      {sortComments(commentsData).map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onSubmitComment={handleReply}
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
          onHandleLike={handleLike}
          onHandleDisLike={handleDisLike}
        />
      ))}
    </>
  );
};

export default NestedComments;
