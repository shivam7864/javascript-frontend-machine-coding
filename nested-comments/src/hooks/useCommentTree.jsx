import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);
  const insertNode = (tree, commentId, newComment) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, newComment),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const deleteNode = (comments, commentId) => {
    return comments.reduce((acc, node) => {
      if (node.id === commentId) {
        return acc;
      } else if (node.replies && node.replies.length > 0) {
        node.replies = deleteNode(node.replies, commentId);
      }
      return [...acc, node];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  const handleDelete = (comment, commentId) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: handleDelete(comment.replies, commentId),
        };
      }
      return comment;
    });
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((node) => {
      if (node.id === commentId) {
        return {
          ...node,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: editNode(node.replies, commentId, content),
        };
      }
      return node;
    });
  };

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const likeNode = (tree, commentId) => {
    console.log("likeNode");
    
    return tree.map((node) => {
      if (node.id === commentId) {
        return {
          ...node,
          votes: node.votes + 1,
        };
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: likeNode(node.replies, commentId),
        };
      }
      return node;
    });
  };

  const likeComment = (commentId) => {
    console.log("liked");
    
    setComments((prevComments) => likeNode(prevComments, commentId));
  };

  const disLikeNode = (tree, commentId) => {
    console.log("disLikeNode");
    
    return tree.map((node) => {
      if (node.id === commentId) {
        return {
          ...node,
          votes: node.votes - 1,
        };
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: disLikeNode(node.replies, commentId),
        };
      }
      return node;
    });
  };
  const disLikeComment = (commentId) => {
    console.log("disliked");
    setComments((prevComments) => disLikeNode(prevComments, commentId));
  };

  return {
    comments,
    insertComment,
    deleteComment,
    editComment,
    likeComment,
    disLikeComment
  };
};
export default useCommentTree;
