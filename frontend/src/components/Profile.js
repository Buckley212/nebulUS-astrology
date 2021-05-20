import React, { useContext, useEffect, useState } from "react";
import actions from "../services/api";
import TheContext from "../services/TheContext";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import Auth from "../services/Auth";
import signs from "../signs.json";

const Profile = () => {
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

  const revealChart = () => {
    return (
      <div>
        {user?.sun ? (
          <div className="chart">
            <p>Sun: {user.sun}</p>
            <p>Moon: {user.moon}</p>
            <p>Rising: {user.rising}</p>
            <ul className="friends">
              {friends?.map((a) => (
                <li>
                  <p>{a.name}</p>
                  <button value={a.googleId} onClick={(e) => removeFriend(e)}>
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="date" onChange={(e) => setDate(e.target.value)} />
            <input type="time" onChange={(e) => setTime(e.target.value)} />
            <input type="text" onChange={(e) => setPlace(e.target.value)} />
            <button type="submit" className="submit ani">
              Submit
            </button>
          </form>
        )}
      </div>
    );
  };

  const sunSignType = signs[0].Sun[user.sun]?.Type;
  const sunSignRuler = signs[0].Sun[user.sun]?.Ruler;
  const sunSignKeywords = signs[0].Sun[user.sun]?.Keywords;
  const sunSignStrengths = signs[0].Sun[user.sun]?.Strengths;
  const sunSignWeaknesses = signs[0].Sun[user.sun]?.Weaknesses;
  const moonSign = signs[0].Moon[user.moon]?.Summary;
  const risingSign = signs[0].Rising[user.rising]?.Summary;

  console.log("Sun Type:====>", sunSignType);
  console.log("Sun Ruler:====>", sunSignRuler);
  console.log("Sun Keywords:====>", sunSignKeywords);
  console.log("Sun Strengths:====>", sunSignStrengths);
  console.log("Sun Weaknesses:====>", sunSignWeaknesses);
  console.log("Rising:====>", risingSign);
  console.log("Moon:====>", moonSign);
  // const hor = () => {
  //     return <p>{risingSign.Summary}Hey</p>
  // }

  return (
    <div>
      <p>Profile</p> {user?.name}
      {user?.name ? (
        <section>
          <img src={user?.imageUrl} alt="profile avi" />
          <p>{user?.email}</p>
          {revealChart()}
          {/* {hor()} */}
          {console.log(signs)}
        </section>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
};

export default Profile;
