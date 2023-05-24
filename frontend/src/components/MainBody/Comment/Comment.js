import "./Comment.css";
import moment from "moment";

import { useState } from "react";

const Comment = (props) => {
  const [commentText] = useState(props.commentText);
  const [commentUser] = useState(props.commentUser);
  const [commentDate] = useState(props.commentDate);

  const relativeTimeOfComment = moment(
    commentDate,
    "MMMM Do YYYY, h:mm:ss a"
  ).fromNow();

  return (
    <div className="Comment">
      <button className="commentUser">
        <div>UserID: {commentUser}</div>
      </button>
      <button className="commentText">
        <div>{commentText}</div>
      </button>
      <button className="commentDate">
        <div>{relativeTimeOfComment}</div>
      </button>
      <br></br>
    </div>
  );
};

export default Comment;
