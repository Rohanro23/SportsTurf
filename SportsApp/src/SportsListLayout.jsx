import { GiCricketBat } from "react-icons/gi";
import { FaFootballBall } from "react-icons/fa";
import axios from "axios";

import { useState, useEffect } from "react";
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
  const [sportsList, setSportsList] = useState([]);
  const [showUnsubscribedModal, setshowUnsubscribedModal] = useState(false);
  const [Unsubscribedlist, setUnsubscribedlist] = useState([]);

  const clickSport = (sportsName) => {
    setSelectedSport(sportsName);
    setShowModal(true);
  };

  useEffect(() => {
    const showList = showAll ? sportsData : sportsData?.slice(0, 8);
    setSportsList(showList);
  }, [sportsData, showAll]);

  useEffect(() => {
    fetchSubscribedList();
  }, []);

  const fetchSubscribedList = () => {
    axios
      .get("http://localhost:3000/api/subscribedList")
      .then((a) => {
        console.log("dataa", a);
        setSubscribedsport(a.data.subscribedList);
      })
      .catch((r) => {
        console.log("error", r);
      });
  };

  const confirmSubscription = () => {
    axios
      .post("http://localhost:3000/api/SubscribedSport", {
        sport: selectedSport,
      })
      .then((a) => {
        fetchSubscribedList();
        setsubscriptionMessage(
          `You have Subscribed to the sport ${selectedSport} Successfully.`
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
  const unsubscribeSport = (a) => {
    axios
      .delete("http://localhost:3000/api/removeList", {
        data: { sport: a },
      })
      .then((q) => {
        fetchSubscribedList();
        setsubscriptionMessage(
          `You have Unsubscribed to the sport ${a} Successfully`
        );
        setShowSubscriptionSection(true);
        setshowUnsubscribedModal(false);
        setTimeout(() => {
          setShowSubscriptionSection(false);
          setsubscriptionMessage("");
        }, 3000);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <div className="sports-icons-container">
      <div className="sport-heading">Pick a sport</div>
      <div className="sports-container">
        {sportsList?.map((d, i) => {
          const Icon = GiCricketBat;
          const isSubscribed = Subscribedsport.includes(d);

          return (
            <div
              key={i}
              className={`list-sports ${isSubscribed ? "disabled" : ""}`}
              onClick={() => !isSubscribed && clickSport(d)}
            >
              <div className="sports-icon">{Icon ? <Icon /> : ""}</div>
              <div>{d}</div>
            </div>
          );
        })}
      </div>
      <div className="btn-show">
        <button onClick={() => setshowAll(!showAll)}>
          {showAll ? "Show Less △" : "Show More ▽"}
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
          <div className="subscribe-heading">You've been Subscribed to:</div>

          {Subscribedsport.map((a, i) => (
            <li key={i} className="subscribed-games">
              {a}
              <button
                className="unsubscribe-btn"
                onClick={() => {
                  setUnsubscribedlist(a);
                  setshowUnsubscribedModal(true);
                }}
              >
                X
              </button>
            </li>
          ))}
        </div>
      )}
      {showUnsubscribedModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Do you want to Unsubscribe from Sport {Unsubscribedlist}? </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setshowUnsubscribedModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-btn"
                onClick={() => unsubscribeSport(Unsubscribedlist)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsListLayout;
