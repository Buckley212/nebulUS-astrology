import React, { useEffect, useState, useContext } from 'react';
import actions from '../services/api';
import TheContext from '../services/TheContext';
import { Link } from 'react-router-dom';
import Auth from '../services/Auth';

const Friends = props => {

    const { user, setUser } = useContext(TheContext);
    const [pal, setPal] = useState('');
    const [friends, setFriends] = useState()
    
    useEffect(() => {
        actions.getFriends({ userId: user?.googleId }).then((res) => {
            console.log(res);
            setFriends(res);
        })
    }, [])

    const handleSubmit = e => {
        const requestAdd = { friend: pal, userId: user?.googleId }
        actions.addFriend(requestAdd).then((res) => {
            console.log(res)
        })
    }

    console.log(friends)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What's poppin'" onChange={e => setPal(e.target.value)}/>
                <button>Submit</button>
            </form>
            <ul>
                {friends.map(a => <li><p>{a.name}</p></li>)}
            </ul>
        </div>
    )
}

export default Friends;