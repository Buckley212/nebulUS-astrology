import React, { useEffect, useState, useContext } from 'react';
import TheContext from '../services/TheContext';
import { Link } from 'react-router-dom';

const Home = props => {
    const [modalIsOpen,setModalIsOpen] = useState(false)
    const { user, setUser } = useContext(TheContext)

    const loginClick = () => {
        setModalIsOpen(!modalIsOpen)
      
      }
    return (
        <div className="Home">    
            {user?.name}
            {user?.name ?
                <section>
                    <h1>Hey</h1>
                </section>
                :
                <div className="homecontent">
                    <span>
                        <img src="/resources/nightsky.png" className="nightsky" alt="logo" />
                    </span>
                    <span className="txtspan">Here at nebulUS we want to help you explore the galaxy of yourself and build your very own constellations of friends! Input your birthday to get started ★
                        <br/>
                        <button className='submit ani'>
                            <div style={{ textDecoration: "none" , color: "#6D95C4"}} onClick={() => loginClick() }> Login</div>
                        </button>
                    </span>
                    {modalIsOpen ? (
     
     <div className="login">
     <div className="x" onClick={() => setModalIsOpen(!modalIsOpen)}>X</div>
      <form className="form">
  
        <label for="email"> Username </label>
        <input type= "text" name= "username" placeholder="Enter Username"  />
        <label for="password">Password</label>
        <input type="password"  placeholder="Enter Password"/>
        <div>
        <input type= "submit" className="submit" name= "submit" value="Login"/>
        </div>
      </form>
      </div>
      ) : null }
                </div>
            }
          
        </div>
    );
}

export default Home;