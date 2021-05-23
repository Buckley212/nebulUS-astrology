import React, { useContext, useEffect, useState } from "react";
import signs from "../signs.json";
import actions from "../services/api";
import TheContext from "../services/TheContext";

const MoonDetails = props => {
  const { user, setUser } = useContext(TheContext);

  const [bud, setBud] = useState();

  useEffect(() => {
    actions.getUsers().then((res) => {
      console.log(res)
      setBud(res?.find(e => e?.googleId === props.match.params.googleId))
    });
  }, []);

  const moonImages = [
    "/resources/moonDetail2.jpg",
    "/resources/moonDetail3.jpg",
    "/resources/moonDetail4.jpg",
    "/resources/moonDetail5.jpg",
    "/resources/moonDetail6.jpg",
  ];

  const showMoonDeets = () => {
    let moonObj = signs[0].Moon[bud?.moon]?.Description;

    return Object.keys(moonObj).map((key) => {
      console.log(key, moonObj[key]);
      return (
        <div className="signPageContent">
          <h1 style={{ paddingTop: "30px" }}>{key}</h1>
          <div className="signDetails">{moonObj[key]}</div>
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
      <h1>The Moon Sign: {bud?.moon}</h1>
      {/* <div> */}
      {/* <div>Summary: {signs[0].Moon[bud?.moon]?.Summary}</div>
      </div> */}
      <img src="/resources/moonDetail1.jpg" alt="moon image" />
      { bud ? 
        <div>{showMoonDeets()}</div>
        :
        <p></p>
      }
    </div>
  );
}

export default MoonDetails;
