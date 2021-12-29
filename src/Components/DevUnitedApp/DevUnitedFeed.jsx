import { useEffect, useState } from "react";
import { firestore } from "../../firebase";

export default function DevUnitedFeed({
  user,
  userNick,
  favTweets,
  setFavTweets,
  color,
}) {
  const images = require.context("../../imgs", true);

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection("tweets")
        .onSnapshot((snapshot) => {
          const tweets = snapshot.docs.map((doc) => {
            return {
              tweet: doc.data().tweet,
              autor: doc.data().autor,
              nickname: doc.data().nickname,
              id: doc.id,
              likes: doc.data().likes,
              email: doc.data().email,
              uid: doc.data().uid,
              photoAuthor: doc.data().photoAuthor,
            };
          });
          setTweets(tweets);
        });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
      const tweetsFav = firestore.collection("users").doc(user.email);
      tweetsFav.get().then((doc) => {
        if (!doc.exists) return;
        if (doc.data().fav) setFavTweets(doc.data().fav);
      });
  }, [user]);

  const deleteTweet = (id) => {
    firestore.doc(`tweets/${id}`).delete();
  };

  const likeTweet = (tweetId, likes = 0) => {
    const newFavTweets = [...favTweets, tweetId];
    if (favTweets.length) {
      if (isFavTweet(tweetId)) {
        const favFilter = favTweets.filter((item) => item !== tweetId);
        firestore.doc(`tweets/${tweetId}`).update({ likes: likes - 1 });
        firestore.doc(`users/${user.email}`).update({ fav: favFilter });
        setFavTweets(favFilter);
      } else {
        firestore.doc(`tweets/${tweetId}`).update({ likes: likes + 1 });
        firestore.doc(`users/${user.email}`).update({ fav: newFavTweets });
        setFavTweets(newFavTweets);
      }
    } else {
      firestore.doc(`tweets/${tweetId}`).update({ likes: likes + 1 });
      firestore.doc(`users/${user.email}`).update({ fav: newFavTweets });
      setFavTweets(newFavTweets);
    }
  };

  const isFavTweet = (tweetId) => {
    if (favTweets) {
      return favTweets.includes(tweetId);
    }
    return false;
  };

  return (
    <div className="tweets-app">
      {user &&
        tweets.map((tweet) => (
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
                    style={{
                      backgroundColor: `${
                        user.uid === tweet.uid ? color.hex : "#800FFF"
                      }`,
                    }}
                  >
                    {user.uid === tweet.uid ? userNick : tweet.nickname}
                  </p>
                  &nbsp;
                  <p className="tweet-date">- 5 jun.</p>
                </div>
                {user && user.uid === tweet.uid && (
                  <img
                    src={images("./deleteIcon.svg").default}
                    onClick={() => deleteTweet(tweet.id)}
                    className="delete-icon like-item"
                    alt="Borrar Tweet"
                  />
                )}
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
                    onClick={() => likeTweet(tweet.id, tweet.likes)}
                    className="like-icon like-item"
                    alt=""
                  />
                  <p className="like-count">{tweet.likes || ""}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
