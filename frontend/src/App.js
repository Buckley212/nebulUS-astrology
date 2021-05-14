import './App.css';
import { useEffect, useState } from 'react';
import TheContext from './services/TheContext';
import { Switch, Link, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Blog from './components/Blog';
import actions from './services/api';

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
 
        {user?.name && (
          <div>
            <p>Welcome {user?.name}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}


        <nav>
          <Link to='/'>Home</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/profile'>Profile</Link>

        </nav>
        <div className="navbar">
      <ul>
        <li>
        <section className="logobox"><img className="logo" src="/resources/nebulUS2.png" alt="logo"/>
        <span className="noto">Nebul<span className="notothin">US</span></span>
        </section></li>
        <li> Profile</li>
        <li> Map</li>
      </ul>
 </div>

<div className="homecontent">
<span>
  <img src="/resources/nightsky.png" className="nightsky" alt="logo"/>
</span>
<span className="txtspan">Here at nebulUS we want to help you explore the galaxy of yourself and build your very own constellations of friends! Input your birthday to get started ★</span>
</div>

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
