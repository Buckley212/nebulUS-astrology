import React, { useEffect, useState, useContext } from "react";
import actions from "../services/api";
import TheContext from "../services/TheContext";
import { Link } from "react-router-dom";

const Friends = (props) => {
  const { user, setUser } = useContext(TheContext);
  const [pal, setPal] = useState("");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    actions.getFriends({ userId: user?.googleId }).then((res) => {
      console.log(res);
      setFriends(res);
    });
  }, []);

  const handleSubmit = (e) => {
    const requestAdd = { friend: pal, userId: user?.googleId };
    actions.addFriend(requestAdd).then((res) => {
      console.log(res);
    });
  };

  const removeFriend = (e) => {
    const requestRemove = { bud: e.target.value, userId: user?.googleId };
    actions.removeFriend(requestRemove).then((res) => {
      console.log(res);
    });
  };

    console.log(friends)
    return (
        <div className="homecontent friends">
            <form onSubmit={handleSubmit}>
                <div className="form" id="friendsForm">
                <input type="text" placeholder="friend@email.com" onChange={e => setPal(e.target.value)} />
                <button type="submit" className="submit ani">Submit</button>
                </div>
            { user?.friends ?
              <table>
                <thead>
                    <tr>
                        <td><h4>Name</h4></td>
                        <td><h4>Sun Sign</h4></td>
                        <td><h4>Moon Sign</h4></td>
                        <td><h4>Rising Sign</h4></td>
                        <td><h4>Remove Friend</h4></td>
                    </tr>
                </thead>
                <tbody>
                    {friends.map(a => <tr><Link to={`/friend/${a?.googleId}`}><td><p>{a?.name}</p></td></Link><td>{a.sun}</td><td>{a?.moon}</td><td>{a?.rising}</td><td><button id="delete" value={a?.googleId} onClick={e => removeFriend(e)}>x</button></td></tr>)}
                </tbody>
              </table>
              :
              <p></p>
            }
            </form>
        </div>
  );
};

export default Friends;
