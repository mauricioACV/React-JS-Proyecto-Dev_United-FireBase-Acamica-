import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import UserProfileFavTweets from "./UserProfileFavTweets";
import UserProfileTweets from "./UserProfileTweets";

export default function UserProfileFeed({ user, userColor, favActive }) {
  const [userTweets, setUserTweets] = useState([]);
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
          const userTweetsFilter = tweets.filter((tweet) => user.uid === tweet.uid);
          setUserTweets(userTweetsFilter);
        });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="tweets-app">
      {favActive ? (
        <UserProfileFavTweets user={user} tweets={tweets} />
      ) : (
        <UserProfileTweets user={user} userColor={userColor} userTweets={userTweets} />
      )}
    </div>
  );
}
