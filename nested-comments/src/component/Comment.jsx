/* eslint-disable react/prop-types */
import { useState } from "react";

const Comment = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
  onHandleLike = () => {},
  onHandleDisLike = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditedContent(comment.content); // Reset edited content to current comment content
  };

  const handleChange = (e) => {
    if (editMode) {
      setEditedContent(e.target.value);
    } else {
      setReplyContent(e.target.value);
    }
  };

  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent);
    setEditMode(false);
  };

  const handleLike = (commentId) => {
    setLiked(!liked);
    setDisLiked(false);
    onHandleLike(commentId);
  };

  const handleDisLike = (commentId) => {
    setDisLiked(!disLiked);
    setLiked(false);
    onHandleDisLike(commentId);
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-info">Votes: {comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div className="add-comment">
          <textarea
            value={editedContent}
            onChange={handleChange}
            rows={3}
            cols={50}
            className="comment-textarea"
          />
          <button onClick={handleEditSubmit} className="comment-button">
            Save Edit
          </button>
          <button onClick={toggleEditMode} className="comment-button">
            Cancel Edit
          </button>
        </div>
      )}

      <div className="comment-actions">
        <button onClick={toggleExpand} className="comment-button">
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button onClick={toggleEditMode} className="comment-button">
          Edit
        </button>
        <button
          onClick={() => onDeleteComment(comment.id)}
          className="comment-button"
        >
          Delete
        </button>
        <button
          onClick={() => handleLike(comment.id)}
          className="comment-button"
          disabled={liked}
        >
          Like
        </button>
        <button
          onClick={() => handleDisLike(comment.id)}
          className="comment-button"
          disabled={disLiked}
        >
          Dislike
        </button>
      </div>

      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              value={replyContent}
              onChange={handleChange}
              placeholder="Add a reply..."
              rows={3}
              cols={50}
              className="comment-textarea"
            />
            <button onClick={handleReplySubmit} className="comment-button">
              Submit Reply
            </button>
          </div>
          {comment?.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onSubmitComment={onSubmitComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
              onHandleLike={onHandleLike}
              onHandleDisLike={onHandleDisLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
