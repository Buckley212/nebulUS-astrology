import React from "react";
import { Link } from "react-router-dom";
import Card from './Card';

function Tarot(props) {
  console.log(props);
  return (
    <div className="tarotpage">
      <div className="tarotbox">
        <img className="tarotcards" src="./moontarot.png" />
        <img className="tarotcards" src="./risingtarot.png" />
        <img className="tarotcards" src="./suntarot.png" />
      </div>
      <Link to={`/profile/sun`}>Sun Summary</Link>
      <Link to={`/profile/moon`}>Moon Summary</Link>
      <Link to={`/profile/rising`}>Rising Summary</Link>
    </div>
    
  );
}

export default Tarot;
