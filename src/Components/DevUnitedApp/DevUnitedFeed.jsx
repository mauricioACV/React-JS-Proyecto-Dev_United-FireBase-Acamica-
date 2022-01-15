import { useEffect } from "react";
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
    <div className="tweets-app">
      {loading ? (
        <Spinner />
      ) : (
        tweets.map((tweet) => (
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
                  alt=""
                />
              </Link>
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
    </div>
  );
}
