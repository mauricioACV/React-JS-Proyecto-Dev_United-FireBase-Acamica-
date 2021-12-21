import { useEffect, useState } from "react";
import { firestore } from "../firebase";

export default function TweetsContainer({ user, favTweets, setFavTweets }) {
  const images = require.context("../imgs", true);

  const [tweets, setTweets] = useState([]);

  console.log(favTweets);

  useEffect(() => {
    if (user) {
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
          });
          setTweets(tweets);
        });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const tweetsFav = firestore.collection("users").doc(user.email);
      tweetsFav.get().then((doc) => {
        if (!doc.exists) return;
        setFavTweets(doc.data().fav);
      });
    }
  }, [user]);

  const deleteTweet = (id) => {
    firestore.doc(`tweets/${id}`).delete();
  };

  const likeTweet = (tweetId, likes = 0) => {
    const newFavTweets = [...favTweets, tweetId];
    const objFavTweet = {
      fav: newFavTweets,
    };
    if (favTweets.length) {
      const alreadyLike = favTweets.includes(tweetId);
      if (alreadyLike) {
        const favFilter = favTweets.filter((item) => item !== tweetId);
        firestore.doc(`tweets/${tweetId}`).update({ likes: likes - 1 });
        firestore.doc(`users/${user.email}`).update({ fav: favFilter });
        setFavTweets(favFilter);
      } else {
        console.log(tweetId);
        firestore.doc(`tweets/${tweetId}`).update({ likes: likes + 1 });
        firestore.doc(`users/${user.email}`).update({ fav: newFavTweets });
        setFavTweets(newFavTweets);
      }
    } else {
      console.log("entro aquí");
      firestore.doc(`tweets/${tweetId}`).update({ likes: likes + 1 });
      firestore.collection("users").doc(user.email).set(objFavTweet);
      setFavTweets(newFavTweets);
    }
  };

  return (
    <div className="tweets-app">
      {user &&
        tweets.map((tweet) => (
          <div key={tweet.id} className="tweet-container">
            <div className="user-profile-photo">
              <img className="user-profile-pic" src={user.photoURL} alt="" />
            </div>
            <div className="tweet">
              <div className="autor-container">
                <p className="font-style-tweet">{tweet.tweet}</p>
                <p className="">por: {tweet.autor}</p>
                <p className="">{tweet.email}</p>
              </div>
              <div className="buttons-tweets-container">
                {user && user.uid === tweet.uid && (
                  <img
                    src={images("./deleteIcon.svg").default}
                    onClick={() => deleteTweet(tweet.id)}
                    className="delete-icon like-item"
                    alt="Borrar Tweet"
                  />
                )}
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
          </div>
        ))}
    </div>
  );
}
