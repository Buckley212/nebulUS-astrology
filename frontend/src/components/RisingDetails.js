import React, { useContext } from "react";
import signs from "../signs.json";
import TheContext from "../services/TheContext";

function RisingDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Rising[user?.rising]?.Summary);

  const showRisingDeets = () => {
    let risingObj = signs[0].Rising[user?.rising]?.Description;

    console.log(Object.keys(risingObj));
    return Object.keys(risingObj).map((key) => {
      console.log(key, risingObj[key]);
      return (
        <div>
          <h1>{key}</h1>
          <div>{risingObj[key]}</div>
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
      {showRisingDeets()}
    </div>

  )

}

export default RisingDetails;
