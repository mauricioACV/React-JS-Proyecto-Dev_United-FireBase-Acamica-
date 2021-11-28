import { useEffect, useState } from "react";
import { firestore } from "./firebase";
import corazon from "./imgs/corazon.svg";

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({ text: "", user: "", likes: "", id: "" });

  useEffect(() => {
    firestore
      .collection("tweets")
      .get()
      .then((snapshot) => {
        const tweet = snapshot.docs.map((doc) => {
          return {
            text: doc.data().tweetText,
            user: doc.data().user,
            id: doc.id,
          };
        });
        setTweets(tweet);
      });
  }, []);

  const handleChange = (e) => {
    let nuevoTweet = { ...tweet, [e.target.name]: e.target.value };
    setTweet(nuevoTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();

    let enviarTweet = firestore.collection("tweets").add(tweet);

    let solicitarDocumento = enviarTweet.then((docRef) => {
      return docRef.get();
    });

    solicitarDocumento.then((doc) => {
      let nuevoTweet = {
        tweet: doc.data().tweet,
        user: doc.data().user,
        id: doc.id,
      };
      setTweets([nuevoTweet, ...tweets]);
    });
  };

  const deleteTweet = (id) => {
    const nuevosTweets = tweets.filter((tweet) => {
      return tweet.id !== id;
    });

    setTweets(nuevosTweets);

    firestore.doc(`tweets/${id}`).delete();

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
