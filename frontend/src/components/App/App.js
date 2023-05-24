import "./App.css";
import LeftSide from "../LeftSide/LeftSide";
import MainBody from "../MainBody/MainBody";
import LoginPage from "../LoginPage/LoginPage";
import AccountPage from "../AccountPage/AccountPage";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [userID, setUserID] = useState();
  const [userEmail, setUserEmail] = useState();
  const [boolAccountPageRender, setBoolAccountPageRender] = useState(false);
  const [userSpecificComments, setUserSpecificComments] = useState();

  const attemptLogin = (loginObject) => {
    axios
      .post("http://localhost:8080/CommentApp/backend/", loginObject)
      .then((response) => {
        const sessionResponse = response.data;
        if (sessionResponse.success) {
          console.log(sessionResponse.success);
          setIsLoggedIn(true);
          setUsername(sessionResponse.user);
          setUserID(sessionResponse.userID);
          setUserEmail(sessionResponse.userEmail);
        } else {
          alert(sessionResponse);
        }
      })
      .catch((error) => alert(error));
  };

  const logout = () => {
    axios
      .post("http://localhost:8080/CommentApp/backend/", {
        type: "logoutRequest",
      })
      .then((response) => {
        const sessionResponse = response.data;
        if (sessionResponse.success) {
          console.log(sessionResponse.success);
          setIsLoggedIn(false);
          setBoolAccountPageRender(false);
          setUsername();
        }
      })
      .catch((error) => alert(error));
  };

  const renderAccountPage = () => {
    axios
      .post("http://localhost:8080/CommentApp/backend/", {
        type: "retrieveUserSpecificComments",
        userID: userID,
      })
      .then((response) => {
        const messagesReversed = response.data;
        setUserSpecificComments(messagesReversed.reverse());
        setBoolAccountPageRender(!boolAccountPageRender);
      });
  };

  const changeUsername = (newUsername) => {
    axios
      .post("http://localhost:8080/CommentApp/backend/", {
        type: "changeUserUsername",
        username: username,
      })
      .then((response) => {
        const sessionResponse = response.data;
        if (sessionResponse.success) {
          console.log(sessionResponse.success);
          alert(
            "Username has been successfully changed to: " +
              sessionResponse.newUsername
          );
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <div>
            {boolAccountPageRender ? (
              <div>
                <LeftSide
                  switchButton={"Comments"}
                  renderAccountPage={renderAccountPage}
                  logout={logout}
                ></LeftSide>
                <AccountPage
                  comments={userSpecificComments}
                  email={userEmail}
                  username={username}
                  changeUsername={changeUsername}
                ></AccountPage>
              </div>
            ) : (
              <div>
                <LeftSide
                  switchButton={"Account"}
                  renderAccountPage={renderAccountPage}
                  logout={logout}
                ></LeftSide>
                <MainBody userID={userID} username={username}></MainBody>
              </div>
            )}
          </div>
        ) : (
          <LoginPage attemptLogin={attemptLogin}></LoginPage>
        )}
      </header>
    </div>
  );
};

export default App;
