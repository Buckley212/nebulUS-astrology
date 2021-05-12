import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useContext } from 'react'
import TheContext from './TheContext'
import { Switch, Link, Route } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile';
import Blog from './Blog';
import Auth from './Auth';
import actions from './api';
import { Origin, Horoscope } from "circular-natal-horoscope-js";

function App() {


  const [user, setUser] = useState({})
  const context = { user, setUser }

  useEffect(() => {
    console.log("app mounted")
    actions.getUser().then(res => {
      setUser(res.data)
    })

  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  // const origin = new Origin({
  //     year: 1983,
  //     month: 2, // 0 = January, 11 = December!
  //     date: 13,
  //     hour: 5,
  //     minute: 42,
  //     latitude: 39.299236,
  //     longitude: -76.609383,
  // });
  
  // const horoscope = new Horoscope({
  //     origin: origin,
  //     houseSystem: "whole-sign",
  //     zodiac: "tropical",
  //     aspectPoints: ['bodies', 'moon', 'sun', 'points', 'angles'],
  //     aspectWithPoints: ['bodies', 'moon', 'points', 'angles'],
  //     aspectTypes: ["major", "minor"],
  //     customOrbs: {},
  //     language: 'en'
  // });
  
  // console.log(horoscope.CelestialBodies,  origin)

  return (
    <TheContext.Provider value={context}>
      <div className="App">
        <h1>Hacker Blog </h1>
        {user?.name && (
          <div>
            <p>Welcome {user?.name}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}


        < nav >
          <Link to='/'>Home</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/profile'>Profile</Link>

        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/profile" component={Profile} />

        </Switch>




      </div>
    </TheContext.Provider >
  );
}

export default App;
