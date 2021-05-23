import React, { useContext, useEffect, useState } from "react";
import signs from "../signs.json";
import actions from "../services/api";
import TheContext from "../services/TheContext";

const RisingDetails = props => {

  const { user, setUser } = useContext(TheContext);
  const [bud, setBud] = useState();

  useEffect(() => {
    actions.getUsers().then((res) => {
      console.log(res)
      setBud(res?.find(e => e?.googleId === props.match.params.googleId))
    });
  }, []);

  const risingImages = [
    "/resources/risingDetail2.jpg",
    "/resources/risingDetail3.jpg",
    "/resources/risingDetail4.jpg",
    "/resources/risingDetail5.jpg",
  ];

  const showRisingDeets = () => {
    let risingObj = signs[0].Rising[bud?.rising]?.Description;

    console.log(Object.keys(risingObj));
    return Object.keys(risingObj).map((key) => {
      console.log(key, risingObj[key]);
      return (
        <div className="signPageContent">
          <h1 style={{ paddingTop: "30px" }}>{key}</h1>
          <div className="signDetails">{risingObj[key]}</div>
          {Object.keys(risingObj).indexOf(key) < risingImages.length ? (
            <img
              src={risingImages[Object.keys(risingObj).indexOf(key)]}
              alt="rising images"
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
      <h1>The Rising Sign: {bud?.rising}</h1>
      {/* <div> */}
      {/* <div>Summary: {signs[0].Moon[user?.moon]?.Summary}</div>
      </div> */}
      <img src="/resources/risingDetail1.jpg" alt="rising image" />
      {bud ?
        <div>{showRisingDeets()}</div>
        :
        <p></p>
      }
    </div>
  );
}

export default RisingDetails;
