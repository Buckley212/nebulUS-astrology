import React, { useContext } from "react";
import signs from "../signs.json";
import TheContext from "../services/TheContext";

function MoonDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Moon[user?.moon]?.Summary);

  // return <div>The Moon Sign</div>;

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
      <h1>The Moon Sign:</h1>
      <div>
        <div>Summary: {signs[0].Moon[user?.moon]?.Summary}</div>
      </div>
    </div>

  )
}

export default MoonDetails;
