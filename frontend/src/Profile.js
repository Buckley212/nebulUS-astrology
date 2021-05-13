import React, { useContext, useEffect, useState } from 'react';
import actions from './api';
import TheContext from './TheContext';
import { Origin, Horoscope } from "circular-natal-horoscope-js";

function Profile(props) {

    const { user } = useContext(TheContext)
    const [myMessages, setMyMessages] = useState([])
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    // useEffect(() => {
    //     actions.getMyMessages().then(messages => {
    //         if (!messages.err)
    //             setMyMessages(messages)
    //     })
    // }, [])

    // function getLocation() {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(showPosition);
    //     } else { 
    //       x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }      

    const handleSubmit = e => {
        e.preventDefault();
        const origin = new Origin({
            year: parseInt(date.slice(0, 4)),
            month: (parseInt(date.slice(5, 7)) - 1), // 0 = January, 11 = December!
            date: parseInt(date.slice(8, 10)),
            hour: parseInt(time.slice(0, 2)),
            minute: parseInt(time.slice(0, 1)),
            latitude: 36.14330291748047,
            longitude: -95.96489715576172,
        });

        //{ date: '2021-05-03', time: '13:26' }

        const horoscope = new Horoscope({
            origin: origin,
            houseSystem: "whole-sign",
            zodiac: "tropical",
            aspectPoints: ['bodies', 'moon', 'sun', 'points', 'angles'],
            aspectWithPoints: ['bodies', 'moon', 'points', 'angles'],
            aspectTypes: ["major", "minor"],
            customOrbs: {},
            language: 'en'
        });
        const userChart = { chart: horoscope.CelestialBodies, userId: user?.googleId, rising: horoscope._ascendant }
        actions.submitDate(userChart).then(res => {
            console.log(res.data.chart);
        })
    }

    const revealChart = () => {
        if (user?.chart !== undefined) {
            console.log(user.chart)
            return <div className="chart">
                <p>Sun: {user?.chart?.sun.Sign.label}</p>
                <p>Moon: {user?.chart?.moon.Sign.label}</p>
                <p>Rising: {user?.rising?.Sign.label}</p>
            </div>
        } else if (user?.chart === undefined) {
            return <form onSubmit={handleSubmit}>
                <input type="date" onChange={e => setDate(e.target.value)} />
                <input type="time" onChange={e => setTime(e.target.value)} />
                <button>Submit</button>
            </form>
        }
    }

    const properties = {
        zodiac: {
            ascendant: {
                sign: 3,      // Sets ascendant by sign. See src/zodiac.js.
                degree: 15    // Sets degree offset for ascendant sign.
            }
        },
        planets: {        // Sets degree of planets.
            sun: 65,
            mercury: 12,
            venus: 151.31,
            mars: 231,
            moon: 188,
            jupiter: 311,
            saturn: 100,
            uranus: 199,
            neptune: 278,
            pluto: 31
        },
        houses: {
            hasHouses: true,
            axes: {
                axis2to8: 27,   // Sets degree of axis.
                axis3to9: 56,
                axis4to10: 81,
                axis5to11: 114,
                axis6to12: 156
            }
        }
    };
    // const h = new zastro.Horoscope(properties);
    // const drawn = h.draw("#horoscope");
    // console.log("Hurray! You have drawn your horoscope.", drawn);

    return (
        <div>
            Profile {user?.name}
            {<img src={user?.imageUrl} />}
            {user?.email}

            {/* {myMessages.map(({ message, _id }) => <li key={_id}>{message}</li>)} */}
            {revealChart()}
        </div>
    );
}

export default Profile;