import React, { useEffect, useState, useContext } from 'react';
import actions from '../services/api';
import TheContext from '../services/TheContext';
import { Link } from 'react-router-dom';

const Friends = props => {

    const { user, setUser } = useContext(TheContext);
    const [pal, setPal] = useState('');
    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
        actions.getFriends({ userId: user?.googleId }).then((res) => {
            console.log(res);
            setFriends(res.data);
        })
    }, []);

    const handleSubmit = e => {
        const requestAdd = { friend: pal, userId: user?.googleId }
        actions.addFriend(requestAdd).then((res) => {
            console.log(res)
        })
    };

    const removeFriend = e => {
        const requestRemove = { friend: e.target.value, userId: user?.googleId }
        actions.removeFriend(requestRemove).then((res) => {
            console.log(res)
        })
    }

    console.log(friends)
    return (
        <div className="homecontent">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What's poppin'" onChange={e => setPal(e.target.value)} />
                <button type="submit" className="submit ani">Submit</button>
            </form>
            {friends?.map(a => <li><p>{a.name}</p><button value={a.googleId} onClick={removeFriend}>x</button></li>)}
        </div>
    );
}

export default Friends;