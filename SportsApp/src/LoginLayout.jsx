import "./LoginLayout.css";
import axios from "axios";
import { useEffect, useState, memo } from "react";
import { LandingPage } from "./LandingPage";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn, userName, newuserName } from "./Redux/userSlice";

const LoginLayout = ({ componentName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [layoutName, setLayoutName] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLayoutName(componentName);
  }, [componentName]);

  const ClickHandler = (a) => {
    axios
      .post("http://localhost:3000/api/login", {
        username,
        password,
      })
      .then((r) => {
        console.log("r", r);

        if (r.data.isLogin) {
          const logindata = r.data.token;

          const payload = logindata.split(".")[1];
          const payloadData = JSON.parse(atob(payload));

          localStorage.setItem("token", logindata);
          dispatch(userName(payloadData.name));
          dispatch(newuserName(payloadData.name));

          navigate("/landing");
        } else {
          setLayoutName("signup");
        }
        dispatch(userLoggedIn(r.data.isLogin));
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError("password is required");
    } else if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const changeHandlerUser = (b) => {
    console.log("userchange", b.target.value); //r
    setUsername(b.target.value);

    if (!b.target.value) {
      setUsernameError("NO email typed");
    } else if (!emailRegex.test(b.target.value)) {
      setUsernameError("Username format incorrect");
    } else {
      setUsernameError("");
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
          onChange={changeHandlerUser}
        />
      </div>
      <div>{usernameError.length > 0 && <p>{usernameError}</p>}</div>

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
      <div> {passwordError && <p> {passwordError}</p>}</div>
      {layoutName === "signup" && (
        <div className="confirm-pwd">
          <input
            className="password password-color"
            type="text"
            name="confirmpassword"
            placeholder="Confirm password"
            onChange={changeHandlerPassword}
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
    </div>
  );
};
export default LoginLayout;
