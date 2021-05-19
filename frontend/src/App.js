import "./App.css";
import { useEffect, useState } from "react";
import TheContext from "./services/TheContext";
import { Switch, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Blog from "./components/Blog";
import actions from "./services/api";
import Friends from "./components/Friends";

function App() {
  const [user, setUser] = useState({});
  const context = { user, setUser };

  useEffect(() => {
    console.log("app mounted");
    actions.getUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <TheContext.Provider value={context}>
      <div className="App">
        HELLOOOO
        {user?.name && (
          <div>
            <p>Welcome {user?.name}</p>
            <button onClick={handleLogout}>
              <Link to="/home">Log out</Link>
            </button>
          </div>
        )}
        <nav className="navbar">
          <section className="logobox">
            <img className="logo" src="/resources/nebulUS2.png" alt="logo" />
            <span className="noto">
              Nebul<span className="notothin">US</span>
            </span>
          </section>
          <Link to="/">Home</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </TheContext.Provider>
  );
}

export default App;
