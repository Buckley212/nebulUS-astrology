import React, { useContext, useEffect, useState } from 'react';
import actions from './api';
import TheContext from './TheContext';
import { Origin, Horoscope } from "circular-natal-horoscope-js";

function Profile(props) {

    const { user } = useContext(TheContext)
    const [myMessages, setMyMessages] = useState([])
    const [chart, setChart] = useState({});
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
            month: (parseInt(date.slice(5, 7))-1), // 0 = January, 11 = December!
            date: parseInt(date.slice(8, 10)),
            hour: parseInt(time.slice(0, 1)),
            minute: parseInt(time.slice(0, 1)),
            latitude: 25.6668494,
            longitude: -80.42151369999999,
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
        console.log(horoscope.CelestialBodies, origin)
        const userChart = { chart: horoscope.CelestialBodies, userId: user?.googleId }
        actions.submitDate(userChart).then(res => {
            console.log(res.data.chart);
        })
    }
    
    const revealChart = () => {
        if (user?.chart !== undefined) {
            return <div className="chart">
                <p>Sun: {user?.chart?.sun.Sign.label}</p>
                <p>Moon: {user?.chart?.moon.Sign.label}</p>
                <p>Rising: {user?.chart?.mercury.Sign.label}</p>
            </div>
        } else if (user?.chart?.length === undefined) {
            return <form onSubmit={handleSubmit}>
                <input type="date" onChange={e => setDate(e.target.value)} />
                <input type="time" onChange={e => setTime(e.target.value)} />
                <button>Submit</button>
            </form>
        }
    }

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