import { useState } from "react";
import { firestore } from "../firebase";

export default function FormNewTweet({ user }) {
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
  });

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
    firestore.collection("tweets").add(tweet);
  };

  return (
    <form className="App-form-container">
      <div className="form-container">
        <textarea
          className="tweet-text"
          placeholder="What’s happening?"
          onChange={handleChange}
          name="tweet"
          rows="4"
          cols="50"
        ></textarea>
        <div className="autor-button">
          <p className="max-char">200 max.</p>
          <button className="send-tweet" onClick={sendTweet}>
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
