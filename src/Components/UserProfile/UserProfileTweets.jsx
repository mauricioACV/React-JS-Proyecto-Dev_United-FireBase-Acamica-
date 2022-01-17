import { useEffect, useState } from "react";
import { handleLikeTweet, handleDelete } from "../../Handlers/tweetsHandlers";
import tweetsHelper from "../../Helpers/tweetsHelpers";
import userHelpers from "../../Helpers/userHelpers";
import Spinner from "../Common/Spinner";

export default function UserProfileTweets({
  user,
  userColor,
  tweets,
  loading,
}) {
  const images = require.context("../../imgs", true);

  const [favTweets, setFavTweets] = useState(null);
  const [userTweets, setUserTweets] = useState([]);

  const [sortTweets, setSortTweets] = useState([]);

  useEffect(() => {
    if (userTweets) {
      const sortTweetsByDate = tweetsHelper.sortTweetsByDate(userTweets);
      setSortTweets(sortTweetsByDate);
    }
  }, [userTweets]);

  useEffect(() => {
    const userTweetsFilter = tweets.filter((tweet) => user.uid === tweet.uid);
    setUserTweets(userTweetsFilter);
  }, [user, tweets]);

  useEffect(() => {
    tweetsHelper.getFav(user.email).then((data) => {
      setFavTweets(data);
    });
  }, [user]);

  const likeTweet = (tweetId, likes = 0) => {
    const newFavTweets = handleLikeTweet(user.email, favTweets, tweetId, likes);
    setFavTweets(newFavTweets);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        sortTweets.map((tweet) => (
          <div key={tweet.id} className="tweet-container animate__animated animate__fadeIn">
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
                  <div className="tweet-autor-date">
                    <p
                      className="tweet-author"
                      style={{ backgroundColor: `${userColor.hex}` }}
                    >
                      {tweet.nickname}
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
                      color: `${userColor.hex}`,
                    }}
                  >
                    {tweet.email}
                  </p>
                </div>
                <img
                  src={images("./deleteIcon.svg").default}
                  onClick={() => handleDelete(tweet.id)}
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
                      images(
                        `./corazon${
                          userHelpers.isFavTweet(favTweets, tweet.id) ? "" : "_"
                        }.svg`
                      ).default
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
        ))
      )}
    </>
  );
}
