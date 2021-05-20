import React, { useContext } from "react";
import TheContext from "../services/TheContext";
import signs from "../signs.json";

function SunDetails(props) {
  const { user, setUser } = useContext(TheContext);

  // const sunImages = [];

  const showSunDeets = () => {
    let sunObj = signs[0].Sun[user?.sun]?.Description;
    // console.log(sunObj.Summary);
    console.log(Object.keys(sunObj));
    return Object.keys(sunObj).map((key) => {
      console.log(key, sunObj[key]);
      return (
        <div>
          <h1>{key}</h1>
          <div>{sunObj[key]}</div>
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
      {showSunDeets()}
    </div>
  );
}

export default SunDetails;
