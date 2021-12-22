import { useState } from "react";
import { firestore } from "../firebase";

export default function FormNewTweet({ user }) {
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
    photoAuthor: "",
  });

  const handleChange = (e) => {
    let nuevoTweet = {
      tweet: e.target.value,
      uid: user.uid,
      email: user.email,
      autor: user.displayName,
      photoAuthor: user.photoURL,
    };
    setTweet(nuevoTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    firestore.collection("tweets").add(tweet);
    setTweet({
      tweet: "",
      autor: "",
      uid: "",
      email: "",
      photoAuthor: "",
    });
  };

  return (
    <form className="App-form-container">
      <div className="form-container">
        <div className="form-header">
          <div className="user-profile-photo">
            <img className="profile-pic-tweet" src={user.photoURL} alt="" />
          </div>
          <div className="new-tweet-container">
            <textarea
              className="tweet-text"
              placeholder="What’s happening?"
              onChange={handleChange}
              value={tweet.tweet}
              name="tweet"
              maxLength="200"
            ></textarea>
            <div className="autor-button">
              <div className="tweet-indicator">
                <p className="rest-char">7</p>
                <p className="max-char">200 max.</p>
              </div>
              <button className="send-tweet" onClick={sendTweet}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
