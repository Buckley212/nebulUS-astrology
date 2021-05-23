import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from './Card';
import signs from "../signs.json";
import TheContext from "../services/TheContext";

const Tarot = person => {
  const { user } = useContext(TheContext);
  const risingChart = {
    type: 'Rising',
    sign: signs[0].Rising[person?.rising],
    img: '/risingtarot.png',
    sum: signs[0].Rising[person?.rising].Summary,
    a: person.googleId
  };
  
  const sunChart = {
    type: 'Sun',
    sign: signs[0].Sun[person?.sun],
    img: '/suntarot.png',
    sum: signs[0].Sun[person?.sun].Description.Summary,
    a: person.googleId
  };

  const moonChart = {
    type: 'Moon',
    sign: signs[0].Moon[person?.moon],
    img: '/moontarot.png',
    sum: signs[0].Moon[person?.moon].Summary,
    a: person.googleId
  };
  
  return (
    <div className="tarotpage">
        <p>{person?.name}</p>
        <img src={person?.imageUrl} className="avi" alt="profile avi" />
        <p>{person?.email}</p>
      <div className="tarotbox">
        {Card(sunChart)}
        {Card(risingChart)}
        {Card(moonChart)}
      </div>
    </div>
  );
}

export default Tarot;
