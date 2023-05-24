import "./LoginPage.css";
import LoginForm from "./LoginForm/LoginForm";
import CreateAccountForm from "./CreateAccountForm/CreateAccountForm";

import { useState } from "react";

const LoginPage = (props) => {
  const [userHasAccount, setUserHasAccount] = useState(true);

  const switchForm = () => {
    setUserHasAccount(!userHasAccount);
  };

  return (
    <div className="wholeLoginPage">
      {userHasAccount ? (
        <div>
          <div className="textLogin">Welcome to neptune</div>
          <div className="seperatorBig"></div>
          <LoginForm
            attemptLogin={props.attemptLogin}
            lowerButtonOnClick={switchForm}
          ></LoginForm>
        </div>
      ) : (
        <CreateAccountForm lowerButtonOnClick={switchForm}></CreateAccountForm>
      )}
    </div>
  );
};

export default LoginPage;
