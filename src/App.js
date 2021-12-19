import { useEffect, useState } from "react";
import { firestore, auth, loginWithGoogle, logout } from "./firebase";

const images = require.context("./imgs", true);

function App() {
  const [tweets, setTweets] = useState([]);
  const [fTweets, setFavTweets] = useState({
    fav: "",
    docId: "",
  });
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
  });
  const [user, setUser] = useState(null);

  console.log(tweets);
  console.log(fTweets);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    if(user) {
      const unsubscribe = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            id: doc.id,
            likes: doc.data().likes,
            email: doc.data().email,
            uid: doc.data().uid,
          };
        })
        setTweets(tweets);
      });
    return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection("users")
        .onSnapshot((snapshot) => {
          const favTw = snapshot.docs.map((doc) => {
            if (doc.data().userId === user.uid) {
              return {
                fav: [doc.data().favTweets[0]],
                docId: doc.id,
              } 
                
            } else {
              return null;
            }
          });
          setFavTweets(favTw);
        });
      return () => unsubscribe();
    }
  }, [user]);




  const handleChange = (e) => {
    let nuevoTweet = {
      tweet: e.target.value,
      uid: user.uid,
      email: user.email,
      autor: user.displayName,
    };
    setTweet(nuevoTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    console.log(tweet)
    firestore.collection("tweets").add(tweet);
  };

  const deleteTweet = (id) => {
    firestore.doc(`tweets/${id}`).delete();
  };

  const likeTweet = (id, likes = 0) => {
    console.log(id);
    console.log(likes);
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });

    console.log(fTweets[0].fav)
    const newFav = [...fTweets[0].fav, id];
    console.log(newFav)
    firestore.doc(`users/${fTweets[0].docId}`).update({ favTweets: newFav });
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
            name="tweet"
            rows="4"
            cols="50"
          ></textarea>
          <div className="autor-buttons">
            <button className="send-tweet" onClick={sendTweet}>
              Enviar tweet
            </button>
          </div>
        </div>
      </form>
      <div className="tweet-container">
        {user && tweets.map((tweet) => (
          <div key={tweet.id} className="tweet">
            <div className="autor-container">
              <p className="font-style-tweet">{tweet.tweet}</p>
              <p className="">por: {tweet.autor}</p>
              <p className="">{tweet.email}</p>
            </div>
            <div className="buttons-tweets-container">
              {user && user.uid === tweet.uid && <img
                src={images("./deleteIcon.svg").default}
                onClick={() => deleteTweet(tweet.id)}
                className="delete-icon like-item"
                alt="Borrar Tweet"
              />}
              <div className="likes-container">
                <img
                  src={images("./corazon.svg").default}
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
