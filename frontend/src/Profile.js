import React, { useContext, useEffect, useState } from 'react';
import actions from './api';
import TheContext from './TheContext'

function Profile(props) {

    const { user } = useContext(TheContext)
    const [myMessages, setMyMessages] = useState([])
    useEffect(() => {
        actions.getMyMessages().then(messages => {
            if (!messages.err)
                setMyMessages(messages)
        })
    }, [])

    return (
        <div>
            Profile {user?.name}
            {<img src={user?.imageUrl} />}
            {user?.email}

            {myMessages.map(({ message, _id }) => <li key={_id}>{message}</li>)}
        </div>
    );
}

export default Profile;