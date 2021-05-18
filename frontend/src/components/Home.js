import React, { useEffect, useState, useContext } from 'react';
import actions from '../services/api';
import TheContext from '../services/TheContext';
import { Link } from 'react-router-dom';
import Auth from '../services/Auth';

const Home = props => {

    const { user, setUser } = useContext(TheContext)

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
                        <button className='submit'>
                            <Link to='/profile' style={{ textDecoration: "none" , color: "#6D95C4"}}> Login</Link>
                        </button>
                    </span>
                </div>
            }
        </div>
    );
}

export default Home;