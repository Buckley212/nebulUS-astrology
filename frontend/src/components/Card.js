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
			<div className="col-sm-6 col-lg-4">
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
							        <h4 className="card-title">Back</h4>
							        <h6 className="card-subtitle text-muted">{chart?.sign.Type}</h6>
							    </div>
							    <div className="card-block">
							        <p className="card-text">{chart.sign.Summary || chart.sign.Description.Summary.slice(0, 350)+'...'}</p>
									<Link to={`/tarot/${user.sign}`}>Learn more...</Link>
							    </div>
							</div>
						</div>
					</div>
			    </div>
	        </div>
        </section>)
}

export default Card;