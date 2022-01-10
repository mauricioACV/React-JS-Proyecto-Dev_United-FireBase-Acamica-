import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import UserProfileFavTweets from "./UserProfileFavTweets";
import UserProfileTweets from "./UserProfileTweets";

export default function UserProfileFeed({ user, userColor, userNick, favActive }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
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
  }, [user]);

  return (
    <div className="tweets-app">
      {favActive ? (
        <UserProfileFavTweets user={user} tweets={tweets} userColor={userColor} userNick={userNick} />
      ) : (
        <UserProfileTweets user={user} userColor={userColor} tweets={tweets} />
      )}
    </div>
  );
}
