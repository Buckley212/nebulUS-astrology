import React, { useContext, useEffect, useState } from "react";
import actions from "../services/api";
import TheContext from "../services/TheContext";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import Auth from "../services/Auth";
import Tarot from "./Tarot";
import signs from "../signs.json";
import Card from "./Card.js";

const Profile = (props) => {
  const { user, setUser } = useContext(TheContext);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [place, setPlace] = useState();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    actions.getFriends({ userId: user?.googleId }).then((res) => {
      console.log(res);
      setFriends(res.data);
    });
  }, []);

  const [loc, setLoc] = useState({});

  const removeFriend = (e) => {
    const requestRemove = { bud: e.target.value, userId: user?.googleId };
    actions.removeFriend(requestRemove).then((res) => {
      console.log(res);
    });
  };

  const revealChart = () => {
    return (
      <div>
            {user?.sun ?
            <div>
                {Tarot(user)}
                </div>
           :
          <form className="form" id="input" onSubmit={handleSubmit}>
            <input type="date" onChange={(e) => setDate(e.target.value)} />
            <input type="time" onChange={(e) => setTime(e.target.value)} />
            <input id="location" placeholder="Place Of Birth" type="text" onChange={(e) => setPlace(e.target.value)} />
            <button type="submit" className="submit ani">Submit</button>
          </form>
        }
      </div>
    );
  };

  const handleSubmit = (e) => {
    const origin = new Origin({
      year: parseInt(date.slice(0, 4)),
      month: parseInt(date.slice(5, 7)) - 1, // 0 = January, 11 = December!
      date: parseInt(date.slice(8, 10)),
      hour: parseInt(time.slice(0, 2)),
      minute: parseInt(time.slice(0, 2)),
      latitude: loc.lat,
      longitude: loc.lng,
    });

    //Sample output of date and time object { date: '2021-05-03', time: '13:26' }

    const horoscope = new Horoscope({
      origin: origin,
      houseSystem: "whole-sign",
      zodiac: "tropical",
      aspectPoints: ["bodies", "moon", "sun"],
      aspectWithPoints: ["bodies", "moon"],
      aspectTypes: [],
      customOrbs: {},
      language: "en",
    });
    const userChart = {
      sun: horoscope.CelestialBodies.sun.Sign.label,
      moon: horoscope.CelestialBodies.moon.Sign.label,
      userId: user?.googleId,
      rising: horoscope._ascendant.Sign.label,
    };
    actions.submitDate(userChart).then((res) => {
      console.log(res.data.chart);
    });
  };

  return (
    <div className="profile">
      {user?.name ? <section>{revealChart()}</section> : <Auth setUser={setUser} />}
    </div>
  );
};

export default Profile;
