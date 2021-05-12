import React, { useContext, useEffect, useState } from 'react';
import actions from './api';
import TheContext from './TheContext';
import { Origin, Horoscope } from "circular-natal-horoscope-js";

function Profile(props) {

    const { user } = useContext(TheContext)
    const [myMessages, setMyMessages] = useState([])
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    useEffect(() => {
        actions.getMyMessages().then(messages => {
            if (!messages.err)
                setMyMessages(messages)
        })
    }, [])

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
            year: 2020,
            month: 11, // 0 = January, 11 = December!
            date: 1,
            hour: 16,
            minute: 30,
            latitude: 40.0,
            longitude: -70.0,
          });
        actions.submitDate({ date, time }).then(res => console.log(res.data))
        
    }
    const origin = new Origin({
        year: 1983,
        month: 2, // 0 = January, 11 = December!
        date: 13,
        hour: 5,
        minute: 42,
        latitude: 39.299236,
        longitude: -76.609383,
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
    
    console.log(horoscope.CelestialBodies,  origin)

    return (
        <div>
            Profile {user?.name}
            {<img src={user?.imageUrl} />}
            {user?.email}

            {myMessages.map(({ message, _id }) => <li key={_id}>{message}</li>)}
            {/* <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                showTimeInput
                customTimeInput={<ExampleCustomTimeInput />}/> */}
            <form onSubmit={handleSubmit}>
                <input type="date" onChange={e => setDate(e.target.value)} />
                <input type="time" onChange={e => setTime(e.target.value)} />
                
                <button>Submit</button>
            </form>
        </div>
    );
}

export default Profile;