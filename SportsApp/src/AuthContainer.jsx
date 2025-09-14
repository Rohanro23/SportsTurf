import { useState } from "react";
import LoginLayout from "./LoginLayout";
import { useDispatch, useSelector } from "react-redux";

export const AuthContainer = () => {
  const [authFlag, setAuthFlag] = useState(true);
  const [MessageFlag, setMessageFlag] = useState(true);
  const userData = useSelector((state) => state.user);

  return (
    <div className="app-container">
      <div className="app-header">Welcome to Sport App {userData.userName}</div>
      {authFlag ? (
        <LoginLayout componentName="login" />
      ) : (
        <LoginLayout
          componentName="signup"
          messageFlag={MessageFlag}
          onSuccessfullSignUp={() => setAuthFlag(true)}
        />
      )}

      <div className="non-login-section">
        {authFlag ? (
          <>
            <div
              className="sign-up"
              onClick={() => {
                setAuthFlag(false);
              }}
            >
              if you haven't register? <span className="text"> Sign Up </span>
            </div>
            <a href="/" className="forget-link">
              forgetten Password
            </a>
          </>
        ) : (
          <div
            className="sign-up"
            onClick={() => {
              setAuthFlag(true);
              setMessageFlag(false);
            }}
          >
            Already have an account? <span className="text"> Login here</span>
          </div>
        )}
      </div>
    </div>
  );
};
