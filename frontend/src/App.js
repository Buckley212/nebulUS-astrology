import "./App.css"
import { useEffect, useState } from "react";
import TheContext from "./services/TheContext";
import { Switch, Link, Route } from "react-router-dom";
import HamburgerMenu from 'react-hamburger-menu';
import Home from "./components/Home";
import Profile from "./components/Profile";
import actions from "./services/api";
import Friends from "./components/Friends";
import Tarot from "./components/Tarot"
import "./index.css";

const App = () => {
  const [user, setUser] = useState({});
  const[open,setOpen]= useState(false);
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
    setOpen(
      !open
    )
  }
  return (
    <TheContext.Provider value={context}>
      <div className="App">
    
        {user?.name && (
          <div>
            <p>Welcome {user?.name}</p>
            <button onClick={handleLogout}>
              <Link to="/home">Log out</Link>
            </button>
          </div>
        )}
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
            <Link to="/" className="middle" style={{ textDecoration: "none", color:"black" }}>
              Home
            </Link>
            <Link to="/friends" className="middle"  style={{ textDecoration: "none", color:"black" }}>
              Friends
            </Link>
            <Link to="/profile" className="middle"  style={{ textDecoration: "none", color:"black" }}>
              Profile
            </Link>
          </section>
          <HamburgerMenu
     isOpen={open}
       menuClicked={()=> handleClick()}
       className="hamburger"
     />
       <ul className="hamburgerMenu" id={open ? "clickedmenu" : ""}>
    
  
       <Link to="/" style={{ textDecoration: "none" }}>
       <li>  Home  </li>
            </Link>
          
        
            <Link to="/friends"  style={{ textDecoration: "none"}}>
            <li>  Friends    </li>
            </Link>
        
           
            <Link to="/profile"   style={{ textDecoration: "none" }}>
            <li> Profile       </li>
            </Link>
     
  

  </ul>
        </nav>
       
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/tarot" component={Tarot} />
        </Switch>
      </div>
    </TheContext.Provider>
  );
};

export default App;
