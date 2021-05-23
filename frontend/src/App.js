import "./App.css";
import { useEffect, useState } from "react";
import TheContext from "./services/TheContext";
import { Switch, Link, Route } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import Home from "./components/Home";
import Profile from "./components/Profile";
import actions from "./services/api";
import Friends from "./components/Friends";
import Tarot from "./components/Tarot";
import SunDetails from "./components/SunDetails";
import MoonDetails from "./components/MoonDetails";
import RisingDetails from "./components/RisingDetails";
import Friend from './components/Friend';
import "./index.css";

const App = () => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
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
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <TheContext.Provider value={context}>
      <div className="App">
        <nav>
          <section className="logobox">
            <Link to="/">
              <img className="logo" src="/resources/nebulUS2.png" alt="logo" />
            </Link>
            <span className="noto">
              Nebul<span className="notothin">US</span>
            </span>
          </section>
          <section className="links">
            <Link
              to="/"
              className="middle"
              style={{ textDecoration: "none", color: "black" }}
            >
              Home
            </Link>
            <Link
              to="/friends"
              className="middle"
              style={{ textDecoration: "none", color: "black" }}
            >
              Friends
            </Link>
            <Link
              to="/profile"
              className="middle"
              style={{ textDecoration: "none", color: "black" }}
            >
              Profile
            </Link>
          </section>
          <HamburgerMenu
            isOpen={open}
            menuClicked={() => handleClick()}
            className="hamburger"
          />
          <ul className="hamburgerMenu" id={open ? "clickedmenu" : ""}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li> Home </li>
            </Link>

            <Link to="/friends" style={{ textDecoration: "none" }}>
              <li> Friends </li>
            </Link>

            <Link to="/profile" style={{ textDecoration: "none" }}>
              <li> Profile </li>
            </Link>
          </ul>
        {user?.name && (
          <div className='user'>
              <p>Welcome</p>
              <p>{user?.name}</p>
            <button onClick={handleLogout}>
              <Link to="/"><p>Log out</p></Link>
            </button>
          </div>
        )}
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/Sun/:googleId" component={SunDetails} />
          <Route exact path="/profile/Moon/:googleId" component={MoonDetails} />
          <Route exact path="/profile/Rising/:googleId" component={RisingDetails} />
          <Route exact path="/friend/:googleId" component={Friend} />
        </Switch>
        <footer>
          <div class='foot'>
          <h2 id="footerFamily">Connect with Us</h2>
            <div class="iconsPad">
              <img class="sizeIMG" src="/resources/intagram-icon.svg"/>
              <img class="sizeIMG" src="/resources/linkedin-icon.svg"/>
            </div>
          </div>
        </footer>
      </div>
    </TheContext.Provider>
  );
};

export default App;
