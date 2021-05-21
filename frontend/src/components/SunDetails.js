import React, { useContext } from "react";
import TheContext from "../services/TheContext";
import signs from "../signs.json";

const SunDetails = () => {
  const { user, setUser } = useContext(TheContext);

  const sunImages = [
    "/resources/sunDetail2.jpg",
    "/resources/sunDetail3.jpg",
    "/resources/sunDetail4.jpg",
    "/resources/sunDetail5.jpg",
    "/resources/sunDetail6.jpg",
    "/resources/sunDetail7.jpg",
    "/resources/sunDetail8.jpg",
  ];

  const showSunDeets = () => {
    let sunObj = signs[0].Sun[user?.sun]?.Description;

    return Object.keys(sunObj).map((key) => {
      console.log(key, sunObj[key]);
      return (
        <div className="signPageContent">
          <h1 style={{ paddingTop: "30px" }}>{key}</h1>
          <div className="signDetails">{sunObj[key]}</div>
          {Object.keys(sunObj).indexOf(key) < sunImages.length ? (
            <img
              src={sunImages[Object.keys(sunObj).indexOf(key)]}
              alt="sun images"
            />
          ) : null}
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>The Sun Sign: {user.sun}</h1>
      <img src="/resources/sunDetail1.jpg" alt="sun detail 1" />
      {showSunDeets()}
    </div>
  );
};

export default SunDetails;
