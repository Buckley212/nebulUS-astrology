import React, { useContext, useEffect, useState } from "react";
import actions from "../services/api";
import TheContext from "../services/TheContext";
import Auth from "../services/Auth";
import signs from "../signs.json";
import './Card.css';
import { Link } from 'react-router-dom';

const Card = chart => {

	const { user, setUser } = useContext(TheContext);

    return (
        <section>
			<div className="card">
				<div className="card-flip">
					<div className="flip">
                {/* Front */}
                <div className="front">
							<div class="card">
								<img src={`${chart.img}`} alt="sign"/>
							</div>
						</div>
                {/* Back */}
						<div className="back">
							<div className="card">
							    <div className="card-block">
							        <h4 className="card-title">{chart.type}</h4>
							        <h6 className="card-subtitle text-muted">{chart?.sign.Type}</h6>
							        <p className="card-text">{chart.sum?.slice(0, 350) + '...'}</p>
									<Link className="highlight" to={`/profile/${chart.type}/${chart.a}`}><p>Learn more...</p></Link>
							    </div>
							</div>
						</div>
					</div>
			    </div>
	        </div>
        </section>)
}

export default Card;