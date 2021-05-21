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
    sum: signs[0].Rising[user.rising].Summary
  };
  
  const sunChart = {
      type: 'Sun',
      sign: signs[0].Sun[user.sun],
      img: '/suntarot.png',
      sum: signs[0].Sun[user.sun].Description.Summary
  };

  const moonChart = {
      type: 'Moon',
      sign: signs[0].Moon[user.moon],
      img: '/moontarot.png',
      sum: signs[0].Moon[user.moon].Summary
  };
  
  return (
    <div className="tarotpage">
        <p>{user?.name}</p>
        <img src={user?.imageUrl} alt="profile avi" />
        <p>{user?.email}</p>
      <div className="tarotbox">
        {Card(sunChart)}
        {Card(risingChart)}
        {Card(moonChart)}
      </div>
    </div>
  );
}

export default Tarot;
