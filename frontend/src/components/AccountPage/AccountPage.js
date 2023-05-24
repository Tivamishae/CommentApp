import { useState } from "react";
import "./AccountPage.css";
import axios from "axios";
import Comment from "../MainBody/Comment/Comment";

const AccountPage = (props) => {
  const [accPageUsername, setAccPageUsername] = useState(props.username);
  const [accPageEmail, setAccPageEmail] = useState(props.email);
  const [accPagePassword, setAccPagePassword] = useState();

  const handleChangeUsername = (event) => {
    event.preventDefault();

    if (accPageUsername.length > 4 && accPageUsername.length < 21) {
      const newAccountObject = {
        oldUsername: props.username,
        newUsername: accPageUsername,
        type: "changeUserUsername",
      };
      axios
        .post("http://localhost:8080/CommentApp/backend/", newAccountObject)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
  };

  const handleChangeEmail = (event) => {
    event.preventDefault();
    if (
      accPageEmail.includes("@gmail.com") ||
      accPageEmail.includes("@hotmail.com") ||
      accPageEmail.includes("@yahoo.com") ||
      accPageEmail.includes("@outlook.com")
    ) {
      const newAccountObject = {
        username: props.username,
        newEmail: accPageEmail,
        type: "changeUserEmail",
      };
      axios
        .post("http://localhost:8080/CommentApp/backend/", newAccountObject)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[0-9A-Za-z!@#$%]+$/;
    if (accPagePassword.match(passwordPattern)) {
      const newAccountObject = {
        username: props.username,
        newPassword: accPagePassword,
        type: "changeUserPassword",
      };
      axios
        .post("http://localhost:8080/CommentApp/backend/", newAccountObject)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
      setAccPagePassword("");
    }
  };

  return (
    <div>
      <div className="MainBodyAccountField">
        <div>{props.username}</div>
        <div className="accountborder">
          <div className="accDetailsText">Account details:</div>
          <button disabled className="containerButton">
            <button disabled className="accDetailsSide">
              <form onSubmit={handleChangeUsername}>
                <div className="accountText">Change username</div>
                <input
                  value={accPageUsername}
                  className="inputUpdateDetails"
                  type="text"
                  name="updateUsername"
                  onChange={(event) => setAccPageUsername(event.target.value)}
                />
                <button className="updateDetailsButton">Change</button>
                <button disabled className="pushupSmall"></button>
              </form>
              <form onSubmit={handleChangeEmail}>
                <div className="accountText">Change email</div>
                <input
                  value={accPageEmail}
                  className="inputUpdateDetails"
                  type="text"
                  name="updateEmail"
                  onChange={(event) => setAccPageEmail(event.target.value)}
                />
                <button className="updateDetailsButton">Change</button>
                <button disabled className="pushupSmall"></button>
              </form>
              <form onSubmit={handleChangePassword}>
                <div className="accountText">Change password</div>
                <input
                  value={accPagePassword}
                  className="inputUpdateDetails"
                  type="text"
                  name="updatePassword"
                  onChange={(event) => setAccPagePassword(event.target.value)}
                />
                <button className="updateDetailsButton">Change</button>
                <button disabled className="pushupBig"></button>
              </form>
            </button>
            <div className="accountText">Your comments</div>
            <button disabled className="accCommentsSide">
              <div className="chatborderaccountpage">
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
            </button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
