import React, { useContext } from "react";
import signs from "../signs.json";
import TheContext from "../services/TheContext";

function MoonDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Moon);
  return <div></div>;
}

export default MoonDetails;
