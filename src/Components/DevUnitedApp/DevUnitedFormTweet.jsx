import { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Escriba un post para publicar!',
        color: "#fff",
        background: "#150714",
      })
    }
  };

  return (
    <form className="App-form-container">
      <div className="form-container">
        <div className="form-header">
          <div className="user-profile-photo">
            <Link to="/UserProfile">
              <img className="profile-pic-tweet" src={user.photoURL.toString()} alt="user avatar" />
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
            <div className="tweet-progress-text" style={{ width: `${ tweet.tweet.length/2.06 }%` }} ></div>
            <div className="autor-button">
              <div className="tweet-indicator">
                <p className="rest-char">{tweet.tweet.length}</p>
                <p className="max-char">{200 - tweet.tweet.length} max.</p>
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
