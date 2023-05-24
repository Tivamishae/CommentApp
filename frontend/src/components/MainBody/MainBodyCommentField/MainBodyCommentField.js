import "./MainBodyCommentField.css";
import Comment from "../Comment/Comment";
import { useEffect } from "react";

const MainBodyCommentField = (props) => {
  useEffect(() => {}, [props.updateComponent]);

  return (
    <div className="MainBodyCommentField">
      <div className="username">{props.username}</div>
      <div className="chatborder">
        <div>
          {props.comments.map((message) => {
            return (
              <div key={message.CommentID}>
                <Comment
                  commentText={message.Comment}
                  commentDate={message.Date}
                  commentUser={message.UserID}
                ></Comment>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainBodyCommentField;
