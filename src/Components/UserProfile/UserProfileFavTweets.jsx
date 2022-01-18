import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import { handleLikeTweet, handleDelete } from "../../Handlers/tweetsHandlers";
import tweetsHelper from "../../Helpers/tweetsHelpers";
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
  const [sortTweets, setSortTweets] = useState([]);

  useEffect(() => {
    if (favTweets) {
      const sortTweetsByDate = tweetsHelper.sortTweetsByDate(favTweets);
      setSortTweets(sortTweetsByDate);
    }
  }, [favTweets]);

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
        sortTweets?.map((tweet) => (
          <div
            key={tweet.id}
            className="tweet-container animate__animated animate__fadeIn"
          >
            <div className="user-profile-photo">
              <Link
                to={`${
                  user.uid === tweet.uid ? "/UserProfile" : "/" + tweet.nickname
                }`}
              >
                <img
                  className="profile-pic-tweet"
                  src={tweet.photoAuthor}
                  alt="user avatar"
                />
              </Link>
            </div>
            <div className="tweet">
              <div className="tweet-header">
                <div className="tweet-data">
                  <div className="tweet-autor-date">
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
                    <p className="tweet-date">
                      -{" "}
                      {tweetsHelper.tUnixToStringDate(
                        new Date(tweet.date.toDate()).getTime()
                      )}
                    </p>
                  </div>
                  <p
                    className="tweet-email"
                    style={{
                      color: `${
                        user.uid === tweet.uid ? userColor.hex : "#E033FF"
                      }`,
                    }}
                  >
                    {tweet.email}
                  </p>
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
