import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { handleLikeTweet, handleDelete } from "../../Handlers/tweetsHandlers";
import Spinner from "../Common/Spinner";

export default function UserProfileFavTweets({
  user,
  tweets,
  userNick,
  userColor,
}) {
  const images = require.context("../../imgs", true);

  const [favTweets, setFavTweets] = useState(null);
  const [userFavTweets, setUserFavTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  // const deleteTweet = (id) => {
  //   firestore.doc(`tweets/${id}`).delete();
  // };

  useEffect(() => {
    const filterFavTweets = (favIds) => {
      let favFilter = [];
      favIds?.forEach((idFavTweet) => {
        tweets.forEach((tweet) => {
          if (tweet.id === idFavTweet) favFilter.push(tweet);
        });
      });
      setFavTweets(favFilter);
      setTimeout(() => {
        setLoading(false);        
      }, 200);
    };
    filterFavTweets(userFavTweets);
  }, [tweets, userFavTweets]);

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
      setUserFavTweets(tweetsFav);
    };
    getFavTweets(user.email);
  }, [user]);

  const likeTweet = (tweetId, likes = 0) => {
    const newFavTweets = handleLikeTweet(
      user.email,
      userFavTweets,
      tweetId,
      likes
    );
    setUserFavTweets(newFavTweets);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        favTweets?.map((tweet) => (
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
                        user.uid === tweet.uid ? userColor.hex : "#800FFF"
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
                    onClick={() => handleDelete(tweet.id)}
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
                    src={images("./corazon.svg").default}
                    onClick={() => likeTweet(tweet.id, tweet.likes)}
                    className="like-icon like-item"
                    alt=""
                  />
                  <p className="like-count">{tweet.likes || ""}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
