import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./LandingPage.css";
import { useSelector } from "react-redux";
import SportsListLayout from "./SportsListLayout";

export const LandingPage = () => {
  const [SportList, setSportlist] = useState([]);
  const [newSport, setNewSport] = useState("");
  const [needsSubscription, setNeedsSubscription] = useState("");

  const userData = useSelector((state) => state.user);

  const getsportlist = useCallback(() => {
    Promise.all([
      axios.get("http://localhost:3000/api/profile"),
      axios.get("http://localhost:3000/api/sportsList"),
    ])
      .then(([a, b]) => {
        setSportlist(b.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    getsportlist();
  }, []);

  return (
    <>
      {userData.isLoggedIn ? (
        <div className="landing-container">
          <div className="welcome-space">
            <div>
              {" "}
              Welcome, <span className="name">{userData.newuserName}</span>
            </div>

            <div className="">
              <button
                className="logout-btn"
                //onClick={}
              >
                Profile
              </button>
            </div>
          </div>

          <SportsListLayout sportsData={SportList} />
        </div>
      ) : (
        "You need to authenticate"
      )}
    </>
  );
};
