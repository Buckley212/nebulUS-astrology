import axios from 'axios';
import React, { useEffect, useState } from 'react';
import actions from './api'

function Home(props) {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        actions
            .getMessages()
            .then(data => {
                setMessages(data)
            })
    }, [])


    const showMessages = () => messages.map(({ message, _id }) => <li key={_id}>{message}</li>)


    return (
        <div>
            Home
            {showMessages()}
        </div>
    );
}

export default Home;