import "./MainBody.css";
import MainBodyCommentField from "./MainBodyCommentField/MainBodyCommentField";
import CreateComment from "./CreateComment.js/CreateComment";

import { useState, useEffect } from "react";
import axios from "axios";

const MainBody = (props) => {
  const [messages, setMessages] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [updateComponent, setUpdateComponent] = useState(0);

  const handleSubmitNewComment = (event) => {
    event.preventDefault();

    axios.post("http://localhost:8080/CommentApp/backend/", newComment);
    setUpdateComponent(updateComponent + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getComments();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getComments();
  }, [updateComponent]);

  const getComments = () => {
    axios
      .get("http://localhost:8080/CommentApp/backend/")
      .then(function (response) {
        console.log(response.data);
        const messagesReversed = response.data;
        setMessages(messagesReversed.reverse());
      });
  };

  return (
    <div className="MainBody">
      <MainBodyCommentField
        username={props.username}
        updateComponent={updateComponent}
        comments={messages}
      ></MainBodyCommentField>
      <CreateComment
        userID={props.userID}
        handleSubmitNewComment={handleSubmitNewComment}
        setNewComment={setNewComment}
      ></CreateComment>
    </div>
  );
};

export default MainBody;
