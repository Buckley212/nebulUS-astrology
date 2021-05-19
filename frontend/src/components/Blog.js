import React, { useState, useContext } from 'react';
import TheContext from '../services/TheContext';
import actions from '../services/api';
import Auth from '../services/Auth';


const Blog = props => {

    const [message, setMessage] = useState('');

    const { user, setUser } = useContext(TheContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        actions
            .addMessage({ message })
            .then(res => {
                props.history.push('/');
            })
    }
    return (
        <div>
            <h4>Blog </h4>
            {user?.name}

            {user?.name ?

                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="post a message" />
                    <button>Add Message</button>
                </form>
                :
                <Auth setUser={setUser} />
            }
        </div>
    );
};

export default Blog;