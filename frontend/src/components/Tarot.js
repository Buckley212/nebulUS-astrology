import React from 'react';

function Tarot(props) {
    return (
        <div className="tarotpage">
       <div className="tarotbox">
           <img className= "tarotcards" src="./moontarot.png"/>
           <img  className= "tarotcards" src="./risingtarot.png"/>
           <img className= "tarotcards" src="./suntarot.png"/>
       </div>
        </div>
    );
}

export default Tarot;