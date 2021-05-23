import React, { useContext, useEffect, useState } from "react";
import signs from "../signs.json";
import actions from "../services/api";
import TheContext from "../services/TheContext";

const SunDetails = props => {
	const { user, setUser } = useContext(TheContext);
  const [bud, setBud] = useState();

  useEffect(() => {
    actions.getUsers().then((res) => {
      console.log(res)
      setBud(res?.find(e => e?.googleId === props.match.params.googleId))
    });
  }, []);



	const sunImages = [
		"/resources/sunDetail2.jpg",
		"/resources/sunDetail3.jpg",
		"/resources/sunDetail4.jpg",
		"/resources/sunDetail5.jpg",
		"/resources/sunDetail6.jpg",
		"/resources/sunDetail7.jpg",
		"/resources/sunDetail8.jpg",
	];

	const showSunDeets = () => {
		let sunObj = signs[0].Sun[bud?.sun]?.Description;

		return Object.keys(sunObj).map((key) => {
			console.log(key, sunObj[key]);
			return (
				<div className="signPageContent">
					<h1 style={{ paddingTop: "30px" }}>{key}</h1>
					<div className="signDetails">{sunObj[key]}</div>
					{Object.keys(sunObj).indexOf(key) < sunImages.length ? (
						<img
							src={sunImages[Object.keys(sunObj).indexOf(key)]}
							alt="sun images"
						/>
					) : null}
				</div>
			);
		});
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
    >
			<h1>The Sun Sign: {bud?.sun}</h1>
			<img src="/resources/sunDetail1.jpg" alt="sun detail 1" />
      { bud ? 
			<div>{showSunDeets()}</div>
        :
        <p></p>
      }
		</div>
	);
};

export default SunDetails;
