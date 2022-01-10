import { useEffect, useState } from "react";
import { firestore } from "../firebase";

export default function UserProfileTweets({ user, userColor, tweets }) {
  const images = require.context("../imgs", true);

  const [favTweets, setFavTweets] = useState(null);
  const [userTweets, setUserTweets] = useState([]);

  const deleteTweet = (id) => {
    firestore.doc(`tweets/${id}`).delete();
  };

  useEffect(() => {
    const userTweetsFilter = tweets.filter((tweet) => user.uid === tweet.uid);
    setUserTweets(userTweetsFilter);
  }, [tweets]);

  useEffect(() => {
    const getFavTweets = async (userEmail) => {
      const tweetsFav = await firestore
        .collection("users")
        .doc(userEmail)
        .get()
        .then((doc) => {
          if (!doc.exists) return null;
          if (doc.data().fav) return doc.data().fav;
        });
      setFavTweets(tweetsFav);
    };
    getFavTweets(user.email);
  }, [user]);

  const isFavTweet = (tweetId) => {
    if (favTweets) {
      return favTweets.includes(tweetId);
    }
    return false;
  };

  return (
    <>
      {user &&
        userTweets.map((tweet) => (
          <div key={tweet.id} className="tweet-container">
            <div className="user-profile-photo">
              <img
                className="profile-pic-tweet"
                src={tweet.photoAuthor}
                alt=""
              />
            </div>
            <div className="tweet">
              <div className="tweet-header">
                <div className="tweet-data">
                  <p
                    className="tweet-author"
                    style={{ backgroundColor: `${userColor.hex}` }}
                  >
                    {tweet.nickname}
                  </p>
                  &nbsp;
                  <p className="tweet-date">- 5 jun.</p>
                </div>
                <img
                  src={images("./deleteIcon.svg").default}
                  onClick={() => deleteTweet(tweet.id)}
                  className="delete-icon like-item"
                  alt="Borrar Tweet"
                />
              </div>
              <div className="tweet-message">
                <p className="font-style-tweet">{tweet.tweet}</p>
              </div>
              <div className="buttons-tweets-container">
                <div className="likes-container">
                  <img
                    src={
                      images(`./corazon${isFavTweet(tweet.id) ? "" : "_"}.svg`)
                        .default
                    }
                    className="like-icon like-item"
                    alt=""
                  />
                  <p className="like-count">{tweet.likes || ""}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
