import React from "react";
import { Link } from "react-router-dom";

function Tarot(props) {
  return (
    <div className="tarotpage">
      <div className="tarotbox">
        <img className="tarotcards" src="./moontarot.png" />
        <img className="tarotcards" src="./risingtarot.png" />
        <img className="tarotcards" src="./suntarot.png" />
      </div>
      <Link to={`/tarot/${props.match.params.sun}`}>Sun Summary</Link>
      <Link to={`/tarot/${props.match.params.moon}`}>Moon Summary</Link>
      <Link to={`/tarot/${props.match.params.rising}`}>Rising Summary</Link>
    </div>
  );
}

export default Tarot;
