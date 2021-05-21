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
            {user?.name ?
                <section className="horo">
                    <div>
                        <h2>Hey {user.name.split(' ')[0]}!</h2>
                        <h2>Here's your Daily Horoscope for {user.sun}</h2>
                        <img src='/resources/daily.png' />
                        <h4>Overview</h4>
                        <p>You’re hungry to learn new things, Capricorn. Yet, you can sometimes stand in your own way of doing that out of fear. The illuminating sun’s square with dream-big Jupiter today reminds you to stay optimistic and make room for new opportunities that boost your self-expression. Elsewhere, reality is hard to find and a longing for escape is strong, as the capable Virgo moon dances with dreamy Neptune.</p>
                        <div id="cards">
                        <div id="card">
                            <img src='/resources/love.svg' />
                            <h4>Love</h4>
                            <p>You will certainly still feel the effects of today’s transiting planets, so keep your head on straight.</p>
                        </div>
                            <div id="card">
                            <img id="work" src='/resources/work.svg' />
                                <h4>Work</h4>
                                <p>You can experience lateness, missed appointments, or certain facets of your day going awry.</p>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <div className="homecontent">
                    <span>
                        <img src="/resources/nightsky.png" className="nightsky" alt="logo" />
                    </span>
                    <span className="txtspan">Here at nebulUS we want to help you explore the galaxy of yourself and build your very own constellations of friends! Input your birthday to get started ★
                        <br />
                        <Link to='/profile'>
                        <button className='submit ani'>
                            <div style={{ textDecoration: "none" , color: "#6D95C4"}} onClick={() => loginClick() }> Login</div>
                        </button>
                        </Link>
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