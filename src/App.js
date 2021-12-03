import { useEffect, useState } from "react";
import { firestore, auth, loginWithGoogle, logout } from "./firebase";

const images = require.context('./imgs', true);

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({ tweetText: "", user: ""});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweetText: doc.data().tweetText,
            user: doc.data().user,
            likes: doc.data().likes,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });

    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });

    return () => unsubscribe();
  },);

  const handleChange = (e) => {
    let nuevoTweet = { ...tweet, [e.target.name]: e.target.value };
    setTweet(nuevoTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    firestore.collection("tweets").add(tweet);
  };

  const deleteTweet = (id) => {
    firestore.doc(`tweets/${id}`).delete();
  };

  const likeTweet = (id, likes=0) => {
    console.log(id);
    console.log(likes);
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
  };

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
      <form className="App-form-container">
        <div className="form-container">
          <textarea
            placeholder="escribe un tweet..."
            className="tweet-text"
            onChange={handleChange}
            name="tweetText"
            rows="4"
            cols="50"
          ></textarea>
          <div className="autor-buttons">
            <input
              placeholder="autor"
              className="item-form"
              onChange={handleChange}
              name="user"
              type="text"
            />
            <button className="send-tweet" onClick={sendTweet}>
              Enviar tweet
            </button>
          </div>
        </div>
      </form>
      <div className="tweet-container">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet">
            <div className="autor-container">
              <p className="font-style-tweet">{tweet.tweetText}</p>
              <p className="">por: {tweet.user}</p>
            </div>
            <div className="buttons-tweets-container">
              <img
                  src={images('./deleteIcon.svg').default}
                  onClick={() => deleteTweet(tweet.id)}
                  className="delete-icon like-item"
                  alt="Borrar Tweet"
                />
              <div className="likes-container">
                <img
                  src={images('./corazon.svg').default}
                  onClick={() => likeTweet(tweet.id, tweet.likes)}
                  className="like-icon like-item"
                  alt=""
                />
                <p className="like-item">{tweet.likes || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
