import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from './Card';
import signs from "../signs.json";
import TheContext from "../services/TheContext";

const Tarot = () => {
  const { user } = useContext(TheContext);
  const risingChart = {
    type: 'Rising',
    sign: signs[0].Rising[user.rising],
    img: '/risingtarot.png',
  };
  
  const sunChart = {
      type: 'Sun',
      sign: signs[0].Sun[user.sun],
      img: '/suntarot.png'
  };

  const moonChart = {
      type: 'Moon',
      sign: signs[0].Moon[user.moon],
      img: '/moontarot.png'
  };
  
  return (
    <div className="tarotpage">
      <div className="tarotbox">
        {Card(moonChart)}
        {Card(risingChart)}
        {Card(sunChart)}
      </div>
    </div>
  );
}

export default Tarot;
