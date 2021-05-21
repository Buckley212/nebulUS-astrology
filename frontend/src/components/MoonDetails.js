import React, { useContext } from "react";
import signs from "../signs.json";
import TheContext from "../services/TheContext";

function MoonDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Moon[user?.moon]?.Summary);

  // return <div>The Moon Sign</div>;

  const showMoonDeets = () => {
    let moonObj = signs[0].Moon[user?.moon]?.Description;
    // console.log(sunObj.Summary);
    console.log(Object.keys(moonObj));
    return Object.keys(moonObj).map((key) => {
      console.log(key, moonObj[key]);
      return (
        <div>
          <h1>{key}</h1>
          <div>{moonObj[key]}</div>
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
      {showMoonDeets()}
    </div>

  )
}

export default MoonDetails;
