import { useEffect, useState } from "react";
import { handleLikeTweet } from "../../Handlers/tweetsHandlers";
import tweetsHelper from "../../Helpers/tweetsHelpers";
import userHelpers from "../../Helpers/userHelpers";

export default function UserProfileTweets({ user, userColor, tweets }) {
  const images = require.context("../../imgs", true);

  const [favTweets, setFavTweets] = useState(null);
  const [userTweets, setUserTweets] = useState([]);

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
                  onClick={() => tweetsHelper.deleteTweet(tweet.id)}
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
        ))}
    </>
  );
}
