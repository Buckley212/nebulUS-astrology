import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useContext } from 'react'
import TheContext from './services/TheContext'
import { Switch, Link, Route } from 'react-router-dom'
import Home from './Home'
import Profile from './components/Profile';
import Blog from './components/Blog';
import Auth from './Auth';
import actions from './services/api';
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
