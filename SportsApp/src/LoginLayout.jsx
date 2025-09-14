import "./LoginLayout.css";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn, userName, newuserName } from "./Redux/userSlice";

const LoginLayout = ({ componentName, onSuccessfullSignUp, messageFlag }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [layoutName, setLayoutName] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [messageSignup, setMessageSignup] = useState("");
  const [signupErrorMessage, setsignupErrorMessage] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLayoutName(componentName);
  }, [componentName]);

  const ClickHandler = () => {
    if (layoutName === "login") {
      axios
        .post("http://localhost:3000/api/login", {
          email: username,
          password,
        })
        .then((r) => {
          setLoginErrorMsg("");

          if (r.data.isLogin) {
            const logindata = r.data.token;

            const payload = logindata.split(".")[1];
            const payloadData = JSON.parse(atob(payload));

            localStorage.setItem("token", logindata);
            dispatch(userName(payloadData.name));
            dispatch(newuserName(payloadData.name));

            navigate("/landing");
            setsignupErrorMessage("");
          }
          dispatch(userLoggedIn(r.data.isLogin));
        })
        .catch((error) => {
          setLoginErrorMsg(error.response.data.error);
          console.log("err", error);
        });
    } else if (layoutName === "signup") {
      if (password !== confirmPassword) {
        return;
      }

      axios
        .post("http://localhost:3000/api/signup", {
          email: username,
          password,
          isSignup: true,
        })
        .then((r) => {
          console.log("www", r);
          setsignupErrorMessage("");
          setMessageSignup("You have been succefully registered");
          setTimeout(() => {
            setMessageSignup("");
          }, 6000);
          onSuccessfullSignUp(true);
        })
        .catch((error) => {
          console.log("err", error);
          setMessageSignup("");
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setsignupErrorMessage(error.response.data.error);
          } else {
            setsignupErrorMessage("Something went wrong ,Please try again");
          }
          setTimeout(() => {
            setsignupErrorMessage("");
          }, 6000);
        });
    }
  };

  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
    setLoginErrorMsg("");
    if (!e.target.value) {
      setPasswordError(true);
    } else if (!passwordRegex.test(e.target.value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const changeHandlerUser = (b) => {
    setUsername(b.target.value);
    setUsernameError("");
    setLoginErrorMsg("");
    if (b.target.value.length > 0) {
    }
  };

  const userNameBlurHandler = (b) => {
    if (b.target.value.length > 0) {
      const emailVerify = emailRegex.test(b.target.value);
      if (!emailVerify) {
        setUsernameError("Please enter a valid email address");
      }
    }
  };

  const buttonHandler = () => {
    const validation =
      emailRegex.test(username) && passwordRegex.test(password);

    return !validation;
  };

  return (
    <div className="Log-in">
      <div className="title-1">
        {layoutName === "login" ? "Login here" : "Sing up"}
      </div>

      <div className="my-input">
        <input
          className="password"
          type="text"
          name="email"
          placeholder="Email"
          value={username}
          onBlur={userNameBlurHandler}
          onChange={changeHandlerUser}
        />
      </div>
      <div>
        {usernameError.length > 0 && (
          <p className="error-message">{usernameError}</p>
        )}
      </div>

      <div className="my-input">
        <input
          className="password password-color"
          type="text"
          name="password"
          placeholder="Password"
          // autoComplete="off"
          onChange={changeHandlerPassword}
        />
      </div>
      <div>
        {" "}
        {passwordError && (
          <div className="error-message">
            <div>* Password must be at least 8 characters</div>
            <div>* Include at least one uppercase</div>
            <div>* Include at least one lowercase</div>
            <div>* Include at least one number</div>
            <div>* Include at least one special character</div>
          </div>
        )}
      </div>
      {layoutName === "signup" && (
        <div className="confirm-pwd">
          <input
            className="password password-color"
            // type="password"
            type="text"
            name="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </div>
      )}

      <div className="my-input">
        <button
          className="Click-Button"
          onClick={ClickHandler}
          disabled={buttonHandler()}
        >
          {layoutName === "login" ? "Login" : "sign Up"}
        </button>
      </div>
      {layoutName === "login" && loginErrorMsg && (
        <div className="error-message">{loginErrorMsg}</div>
      )}
      {layoutName === "signup" && (
        <>
          {signupErrorMessage ? (
            <div className="error-message">{signupErrorMessage}</div>
          ) : (
            messageFlag &&
            messageSignup && (
              <div className="error-message">{messageSignup}</div>
            )
          )}
        </>
      )}
      {confirmPassword && confirmPassword !== password && (
        <div className="error-message"> Passwords do not match </div>
      )}
    </div>
  );
};
export default LoginLayout;
