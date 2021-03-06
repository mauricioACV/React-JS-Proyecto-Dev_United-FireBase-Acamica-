import { useEffect, useState } from "react";
import { useTweets } from "../../Hooks/useTweets";
import { Link } from "react-router-dom";
import { handleLikeTweet, handleDelete } from "../../Handlers/tweetsHandlers";
import tweetsHelper from "../../Helpers/tweetsHelpers";
import userHelpers from "../../Helpers/userHelpers";
import Spinner from "../Common/Spinner";

export default function DevUnitedFeed({
  user,
  userNick,
  favTweets,
  setFavTweets,
  userColor,
}) {
  const images = require.context("../../imgs", true);
  const { tweets, loading } = useTweets(user);
  const [sortTweets, setSortTweets] = useState([]);

  useEffect(() => {
    if (tweets) {
      const sortTweetsByDate = tweetsHelper.sortTweetsByDate(tweets);
      setSortTweets(sortTweetsByDate);
    }
  }, [tweets]);

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
    <div className="tweets-app animate__animated animate__fadeIn">
      {loading ? (
        <Spinner />
      ) : (
        sortTweets.map((tweet) => (
          <div key={tweet.id} className="tweet-container">
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
                          user.uid === tweet.uid ? userColor.hex : "#E033FF"
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
                        user.uid === tweet.uid ? userColor.hex : "#800FFF"
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
                    src={
                      images(
                        `./corazon${
                          userHelpers.isFavTweet(favTweets, tweet.id) ? "" : "_"
                        }.svg`
                      ).default
                    }
                    onClick={() => likeTweet(tweet.id, tweet.likes)}
                    className="like-icon like-item"
                    alt="like icon"
                  />
                  <p className="like-count">{tweet.likes || ""}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
