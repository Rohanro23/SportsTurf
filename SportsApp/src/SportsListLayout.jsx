import { GiCricketBat } from "react-icons/gi";
import { FaFootballBall } from "react-icons/fa";
import axios from "axios";

import { useState } from "react";
import "./SportsListLayout.css";

const iconMap = {
  Cricket: GiCricketBat,
  Football: FaFootballBall,
};

const SportsListLayout = ({ sportsData }) => {
  const [selectedSport, setSelectedSport] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAll, setshowAll] = useState(false);
  const [subscriptionMessage, setsubscriptionMessage] = useState("");
  const [showSubscriptionSection, setShowSubscriptionSection] = useState(false);
  const [Subscribedsport, setSubscribedsport] = useState([]);

  const clickSport = (sportsName) => {
    setSelectedSport(sportsName);
    setShowModal(true);
  };

  const showList = showAll ? sportsData : sportsData.slice(0, 4);

  const confirmSubscription = () => {
    axios
      .post("http://localhost:3000/api/postSports", {
        sport: selectedSport,
      })
      .then((a) => {
        setSubscribedsport((prev) => [...prev, selectedSport]);

        setsubscriptionMessage(
          `You have Subscribed to the sport ${selectedSport} Successfully`
        );
        setShowSubscriptionSection(true);
        setShowModal(false);
        setTimeout(() => {
          setShowSubscriptionSection(false);
          setsubscriptionMessage("");
        }, 3000);
      })
      .catch((r) => {
        console.log("Error ", r);
      });
  };

  return (
    <div className="sports-icons-container">
      <div className="sport-heading">Pick a sport</div>
      <div className="sports-container">
        {showList.map((d, i) => {
          const Icon = GiCricketBat;
          const isSubscribed = Subscribedsport.includes(d);

          return (
            <div
              key={i}
              className={`list-sports ${isSubscribed ? "disabled" : ""}`}
              onClick={() => !isSubscribed && clickSport(d)}
            >
              <div>{Icon ? <Icon /> : ""}</div>
              <div>{d}</div>
            </div>
          );
        })}
      </div>
      <div className="btn-show">
        <button onClick={() => setshowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>

      {showModal && selectedSport.length > 0 && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Do you want to Subscribe for {selectedSport}? </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmSubscription}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showSubscriptionSection && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{subscriptionMessage}</p>
          </div>
        </div>
      )}

      {Subscribedsport.length > 0 && (
        <div className="subscribed-sports-list">
          <div className="subscribe-heading">You Subscribed To:</div>

          {Subscribedsport.map((a, i) => (
            <li key={i} className="subscribed-games">
              {a}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default SportsListLayout;
