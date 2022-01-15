import { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";

export default function DevUnitedFormTweet({ user, userNick }) {
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
    photoAuthor: "",
    date: null,
  });

  const handleChange = (e) => {
    let nuevoTweet = {
      tweet: e.target.value,
      uid: user.uid,
      email: user.email,
      autor: user.displayName,
      nickname: userNick,
      photoAuthor: user.photoURL,
      date: new Date()
    };
    setTweet(nuevoTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    if (tweet.tweet) {
      firestore.collection("tweets").add(tweet);
      setTweet({
        tweet: "",
        autor: "",
        uid: "",
        email: "",
        photoAuthor: "",
        date: null,
      });
    } else {
      console.log('tweet vacío');
    }
  };

  return (
    <form className="App-form-container">
      <div className="form-container">
        <div className="form-header">
          <div className="user-profile-photo">
            <Link to="/UserProfile">
              <img className="profile-pic-tweet" src={user.photoURL} alt="" />
            </Link>
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
