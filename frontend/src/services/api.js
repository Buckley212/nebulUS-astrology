//API calls
import axios from 'axios';

//Server Location
const serverUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:5000/api`

const token = window.localStorage.getItem('token');

const createHeaders = () => {
    return {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
};



const actions = {

    getUser: async () => {
        return await axios.get(`${serverUrl}/get-user`, createHeaders())
    },

    getMessages: async () => {
        let messages = await axios.get(`${serverUrl}/get-messages`)
        return messages.data
    },

    getMyMessages: async () => {
        let messages = await axios.get(`${serverUrl}/get-my-messages`, createHeaders())
        console.log(messages)
        return messages.data
    },

    addMessage: async ({ message }) => {
        return await axios.post(`${serverUrl}/add-message`, { message }, createHeaders())
    },

    logIn: async ({ profileObj }) => {
        let res = await axios.post(`${serverUrl}/logMeIn`, profileObj)
        localStorage.setItem('token', res?.data?.token)
        return res.data.user
    },

    submitDate: async ({ chart, userId, rising }) => {
        let res = await axios.post(`${serverUrl}/submitDate`, { chart, userId, rising }, createHeaders())
        return res.data
    },

    addFriend: async ({ friend, userId }) => {
        let res = await axios.post(`${serverUrl}/addFriend`, { friend, userId }, createHeaders())
        return res.data
    },

    getFriends: async ({ userId }) => {
        let res = await axios.get(`${serverUrl}/getFriends`, createHeaders())
        console.log(res)
        return res.data
    }
};

export default actions;