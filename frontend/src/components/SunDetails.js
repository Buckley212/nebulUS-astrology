import React, { useContext } from "react";
import TheContext from "../services/TheContext";
import signs from "../signs.json";

function SunDetails(props) {
  const { user, setUser } = useContext(TheContext);

  console.log(signs[0].Sun[user?.sun]?.Type);
  console.log(signs[0].Sun[user?.sun]?.Ruler);

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
      <div>
        <div>Type: {signs[0].Sun[user?.sun]?.Type}</div>
        <div>Ruler: {signs[0].Sun[user?.sun]?.Ruler}</div>
        <div>
          KeyWords:{" "}
          {signs[0].Sun[user?.sun]?.Keywords.map((el, i) => {
            return <div key={i}>{el}</div>;
          })}
        </div>
        <div>
          Strengths:{" "}
          {signs[0].Sun[user?.sun]?.Strengths.map((el) => {
            return <div>{el}</div>;
          })}
        </div>
        <div>
          Weaknesses:{" "}
          {signs[0].Sun[user?.sun]?.Weaknesses.map((el) => {
            return <div>{el}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default SunDetails;
