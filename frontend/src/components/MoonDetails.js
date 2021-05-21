import React, { useContext } from "react";
import signs from "../signs.json";
import TheContext from "../services/TheContext";

function MoonDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Moon[user?.moon]?.Summary);

  const moonImages = [
    "/resources/moonDetail2.jpg",
    "/resources/moonDetail3.jpg",
    "/resources/moonDetail4.jpg",
    "/resources/moonDetail5.jpg",
    "/resources/moonDetail6.jpg",
  ];

  const showMoonDeets = () => {
    let moonObj = signs[0].Moon[user?.moon]?.Description;

    return Object.keys(moonObj).map((key) => {
      console.log(key, moonObj[key]);
      return (
        <div>
          <h1>{key}</h1>
          <div>{moonObj[key]}</div>
          {Object.keys(moonObj).indexOf(key) < moonImages.length ? (
            <img
              src={moonImages[Object.keys(moonObj).indexOf(key)]}
              alt="moon images"
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
        paddingTop: "20px",
      }}
    >
      <h1>The Moon Sign: {user.moon}</h1>
      {/* <div> */}
      {/* <div>Summary: {signs[0].Moon[user?.moon]?.Summary}</div>
      </div> */}
      <img src="/resources/moonDetail1.jpg" alt="moon image" />
      {showMoonDeets()}
    </div>
  );
}

export default MoonDetails;
