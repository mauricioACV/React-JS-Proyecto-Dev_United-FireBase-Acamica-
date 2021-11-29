import { useEffect, useState } from "react";
import { firestore } from "./firebase";
import corazon from "./imgs/corazon.svg";

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({ text: "", user: "", likes: "", id: "" });

  useEffect(() => {
    const cancelarSuscripcion = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            text: doc.data().tweetText,
            user: doc.data().user,
            likes: doc.data().likes,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });

    return () => cancelarSuscripcion();
  }, []);

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

  const likeTweet = (id, likes) => {
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
  };

  return (
    <div className="App">
      <h1>FireBase</h1>
      <h2>Tweets</h2>
      <div className="App-form">
        <textarea
          placeholder="text tweet"
          onChange={handleChange}
          name="tweetText"
          rows="4"
          cols="50"
        ></textarea>
        <div className="autor-button">
          <input
            placeholder="autor tweet"
            className="item-form"
            onChange={handleChange}
            name="user"
            type="text"
          />
          <button className="item-form" onClick={sendTweet}>
            Enviar
          </button>
        </div>
      </div>
      <div className="tweetContainer">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet">
            <p key={tweet.id} id={tweet.id}>
              tweet: {tweet.text} - autor: {tweet.user}
            </p>
            <div className="likes-container">
              <p>{tweet.likes}</p>
              <img
                src={corazon}
                onClick={() => likeTweet(tweet.id, tweet.likes)}
                className="like-icon"
                alt=""
              />
            </div>
            <span className="delete" onClick={() => deleteTweet(tweet.id)}>
              borrar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
