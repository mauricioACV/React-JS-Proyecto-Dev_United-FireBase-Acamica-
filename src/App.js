import { useEffect, useState } from "react";
import FormNewTweet from "./Components/FormNewTweet";
import TweetsContainer from "./Components/TweetsContainer";
import { auth, loginWithGoogle, logout } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setFavTweets([]);
    });
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <div className="user-profile">
          <img className="user-profile-pic" src={user.photoURL} alt="" />
          <p>¡Hola {user.displayName}!</p>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <button className="login-btn" onClick={loginWithGoogle}>
          Login con Google
        </button>
      )}
      <FormNewTweet user={user} />
      <TweetsContainer
        user={user}
        favTweets={favTweets}
        setFavTweets={setFavTweets}
      />
    </div>
  );
}

export default App;
