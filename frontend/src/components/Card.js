import React, { useContext, useEffect, useState } from "react";
import actions from "../services/api";
import TheContext from "../services/TheContext";
import Auth from "../services/Auth";
import signs from "../signs.json";
import './Card.css';

const Card = chart => {
    return (
        <section>
			<div class="col-sm-6 col-lg-4">
				<div class="card-flip">
					<div class="flip">
              <div class="front">
                {/* Front */}
							<div class="card">
							  <img class="card-img-top" data-src="holder.js/100px180/"/>
							  <div class="card-block">
							    <h4 class="card-title">Tarot</h4>
							    <p class="card-text">Lore ipsum</p>
							    <a href="#" class="btn btn-primary">Go somewhere</a>
							  </div>
							</div>
						</div>
						<div class="back">
            {/* Back */}
							<div class="card">
							  <div class="card-block">
							    <h4 class="card-title">Back</h4>
							    <h6 class="card-subtitle text-muted">blah blah blah</h6>
							  </div>
							  <img data-src="holder.js/100px180/?text=Image"/>
							  <div class="card-block">
							    <p class="card-text">blah blah</p>
							    <a href="#" class="card-link">Learn More</a>
							  </div>
							</div>
						</div>
					</div>
				</div>
	    </div>
        </section>)
}

export default Card;