import React, { useContext } from "react";
import signs from "../signs.json";
import TheContext from "../services/TheContext";

function RisingDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Rising[user?.rising]?.Summary);

  const risingImages = [
    "/resources/risingDetail2.jpg",
    "/resources/risingDetail3.jpg",
    "/resources/risingDetail4.jpg",
    "/resources/risingDetail5.jpg",
  ];

  const showRisingDeets = () => {
    let risingObj = signs[0].Rising[user?.rising]?.Description;

    console.log(Object.keys(risingObj));
    return Object.keys(risingObj).map((key) => {
      console.log(key, risingObj[key]);
      return (
        <div>
          <h1>{key}</h1>
          <div>{risingObj[key]}</div>
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
      <h1>The Rising Sign: {user.rising}</h1>
      {/* <div> */}
      {/* <div>Summary: {signs[0].Moon[user?.moon]?.Summary}</div>
      </div> */}
      <img src="/resources/risingDetail1.jpg" alt="rising image" />
      {showRisingDeets()}
    </div>
  );
}

export default RisingDetails;
