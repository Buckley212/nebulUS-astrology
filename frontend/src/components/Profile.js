import React, { useContext, useEffect, useState } from 'react';
import actions from '../services/api';
import TheContext from '../services/TheContext';
import axios from 'axios';
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import Auth from '../services/Auth';

const Profile = props => {
    const { user, setUser } = useContext(TheContext)

    // const [myMessages, setMyMessages] = useState([])
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    const [place, setPlace] = useState();
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

    const [loc, setLoc] = useState({});
    // useEffect(() => {
    //     // axios.get(`https://iron-cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?${place}`)
    //     //     .then(res => {
    //     //         setLoc(res.data.results.geometry.location)
    //         })
    // })
    const handleSubmit = e => {

        const origin = new Origin({
            year: parseInt(date.slice(0, 4)),
            month: (parseInt(date.slice(5, 7)) - 1), // 0 = January, 11 = December!
            date: parseInt(date.slice(8, 10)),
            hour: parseInt(time.slice(0, 2)),
            minute: parseInt(time.slice(0, 2)),
            latitude: loc.lat,
            longitude: loc.lng,
        });
          
        //Sample output of date and time object { date: '2021-05-03', time: '13:26' }
          
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
                <input type="text" onChange={e => setPlace(e.target.value)} />
                <button>Submit</button>
            </form>
        }
    }

    // const properties = {
    //     zodiac: {
    //         ascendant: {
    //             sign: 3,      // Sets ascendant by sign. See src/zodiac.js.
    //             degree: 15    // Sets degree offset for ascendant sign.
    //         }
    //     },
    //     planets: {        // Sets degree of planets.
    //         sun: 65,
    //         mercury: 12,
    //         venus: 151.31,
    //         mars: 231,
    //         moon: 188,
    //         jupiter: 311,
    //         saturn: 100,
    //         uranus: 199,
    //         neptune: 278,
    //         pluto: 31
    //     },
    //     houses: {
    //         hasHouses: true,
    //         axes: {
    //             axis2to8: 27,   // Sets degree of axis.
    //             axis3to9: 56,
    //             axis4to10: 81,
    //             axis5to11: 114,
    //             axis6to12: 156
    //         }
    //     }
    // };
    // const h = new zastro.Horoscope(properties);
    // const drawn = h.draw("#horoscope");
    // console.log("Hurray! You have drawn your horoscope.", drawn);

    return (
        <div>
            <p>Profile</p> {user?.name}
            
            {user?.name ?
                <section>
                    <img src={user?.imageUrl} alt="profile avi" />
                    <p>{user?.email}</p>

                    {revealChart()}
                </section>
                :
                <Auth setUser = { setUser } />
            }
        </div>
    );
}

export default Profile;