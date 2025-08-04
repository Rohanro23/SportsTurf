import "./LoginLayout.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { LandingPage } from "./LandingPage";
import { useNavigate } from "react-router-dom";

export const LoginLayout = ({ componentName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [layoutName, setLayoutName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("inside useffect==================");
    setLayoutName(componentName);
  }, [componentName]);

  console.log("ww", componentName, layoutName);

  const ClickHandler = (a) => {
    axios
      .post("http://localhost:3000/api/login", {
        username: { username },
        password: { password },
      })
      .then((r) => {
        if (r.data) {
          navigate("/landing");
        } else {
          setLayoutName("sign up");
        }
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };
  const changeHandlerUser = (b) => {
    console.log("userchange", b.target.value);
    setUsername(b.target.value);
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
          name="emailOrPhone"
          placeholder="Email address or phone number"
          // pattern="^(\+?\d{10,15}|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$"
          onChange={changeHandlerUser}
        />
      </div>

      <div className="my-input">
        <input
          className="password password-color"
          type="text"
          name="password"
          placeholder="Password"
          onChange={changeHandlerPassword}
        />
      </div>
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
        <button className="Click-Button" onClick={ClickHandler}>
          {layoutName === "login" ? "Login" : "sign Up"}
        </button>
      </div>
    </div>
  );
};
