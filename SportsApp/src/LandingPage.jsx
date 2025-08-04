import { useEffect, useState } from "react";
import axios from "axios";
import "./LandingPage.css";

export const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [SportList, setSportlist] = useState([]);
  const [newSport, setNewSport] = useState("");
  const [needsSubscription, setNeedsSubscription] = useState("");
  console.log("needsSubscription", newSport, needsSubscription);

  useEffect(() => {
    getsportlist();
  }, []);
  const getsportlist = () => {
    Promise.all([
      axios.get("http://localhost:3000/api/profile"),
      axios.get("http://localhost:3000/api/sportsList"),
    ])
      .then(([a, b]) => {
        console.log("new", a);
        setUsername(a.data);
        setSportlist(b.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const Clickaddsport = (a) => {
    console.log("clickdata", a);
    axios
      .post("http://localhost:3000/api/postSports", {
        sport: newSport,
        subscription: needsSubscription,
      })
      .then((a) => {
        console.log("then", a);
        setNewSport("");
        getsportlist();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const Changesavesport = (e) => {
    console.log("onchange", e);
    setNewSport(e.target.value);
  };
  return (
    <div className="landing-container">
      <div className="welcome-space">
        <div>
          {" "}
          Welcome, <span className="name">{username.name}</span>
        </div>

        <div className="">
          <button
            className="logout-btn"
            //onClick={}
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="form-list">
        <div className="form-box">
          <div className="interested-sports">
            Enter the sports you're interested in:
          </div>

          <div>
            <input
              placeholder="Enter your sports name"
              onChange={Changesavesport}
              value={newSport}
              className="sports-name"
            />
          </div>
          <div className="subscription-box">
            <div>Need a Subscription: </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="Do you need a Subscription"
                  value="yes"
                  onChange={(e) => setNeedsSubscription(e.target.value)}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="Do you need a Subscription"
                  value="no"
                  onChange={(e) => setNeedsSubscription(e.target.value)}
                />
                No
              </label>
            </div>
          </div>
          <div className="submit-btn">
            <button
              className="submit-click"
              onClick={Clickaddsport}
              disabled={
                !(newSport?.length > 0 && needsSubscription?.length > 0)
              }
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className="sport-heading"> Your interested Sports:</div>
          <div className="sport-list">
            {SportList?.map((d, i) => (
              <span key={i}>{d},</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
