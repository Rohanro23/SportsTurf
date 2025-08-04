import { useState } from "react";
import { LoginLayout } from "./LoginLayout";

export const AuthContainer = () => {
  console.log("im ");
  const [authFlag, setAuthFlag] = useState(true);
  console.log("auth", authFlag);

  return (
    <div className="app-container">
      <div className="app-header">Welcome to Sport App</div>
      {authFlag ? (
        <LoginLayout componentName="login" />
      ) : (
        <LoginLayout componentName="signup" />
      )}

      <div className="non-login-section">
        {authFlag ? (
          <>
            <div className="sign-up" onClick={() => setAuthFlag(false)}>
              if you haven't register? <span className="text"> Sign Up </span>
            </div>
            <a href="/" className="forget-link">
              forgetten Password
            </a>
            \
          </>
        ) : (
          <div className="sign-up" onClick={() => setAuthFlag(true)}>
            Already have an account? <span className="text"> Login here</span>
          </div>
        )}
      </div>
    </div>
  );
};
