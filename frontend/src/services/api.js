//All of your API calls are going to be in here.
import axios from "axios";

console.log(process.env);
//Where your server/backend lives
const serverUrl = "/api";
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_SERVER_URL
//     : `/api`;
let token = localStorage.getItem("token");
const createHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

axios.get(`${serverUrl}/kangaroo`).then((res) => {
  console.log(res);
});

const actions = {
  getUser: async () => {
    return await axios.get(`${serverUrl}/get-user`, createHeaders());
  },

  getMessages: async () => {
    let messages = await axios.get(`${serverUrl}/get-messages`);
    return messages.data;
  },

  addMessage: async ({ message }) => {
    return await axios.post(
      `${serverUrl}/add-message`,
      { message },
      createHeaders()
    );
  },

  logIn: async ({ profileObj }) => {
    let res = await axios.post(`${serverUrl}/logMeIn`, profileObj);
    console.log(res);
    localStorage.setItem("token", res.data.token);
    return res.data.user;
  },

  submitDate: async ({ chart, userId, rising }) => {
    let res = await axios.post(
      `${serverUrl}/submitDate`,
      { chart, userId, rising },
      createHeaders()
    );
    return res.data;
  },

  addFriend: async ({ friend, userId }) => {
    let res = await axios.post(
      `${serverUrl}/addFriend`,
      { friend, userId },
      createHeaders()
    );
    return res.data;
  },

  getFriends: async ({ userId }) => {
    let res = await axios.get(
      `${serverUrl}/getFriends`,
      { userId },
      createHeaders()
    );
    return res.data;
  },
};

export default actions;
