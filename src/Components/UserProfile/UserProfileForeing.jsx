import { firestore } from "../../firebase";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/ContextProvider";
import { handleLikeTweet } from "../../Handlers/tweetsHandlers";
import userHelpers from "../../Helpers/userHelpers";
import tweetsHelper from "../../Helpers/tweetsHelpers";
import AccessDenied from "../AccessDenied";
import Spinner from "../Common/Spinner";

export default function UserProfileForeing() {
  const images = require.context("../../imgs", true);
  const { user } = useContext(AppContext);
  const params = useParams();
  const { usernickname } = params;

  const [validNickname, setValidNickanme] = useState(false);
  const [foreingUserEmail, setForeingUserEmail] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [favTweets, setFavTweets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTweet, setLoadingTweet] = useState(true);
  const [sortTweets, setSortTweets] = useState([]);

  useEffect(() => {
    if (userTweets) {
      const sortTweetsByDate = tweetsHelper.sortTweetsByDate(userTweets);
      setSortTweets(sortTweetsByDate);
    }
  }, [userTweets]);

  const getUserDetails = async (email) => {
    if (email) {
      const details = await firestore
        .collection("users")
        .doc(email)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            return null;
          } else {
            return {
              color: doc.data().color,
              photoUrl: doc.data().photoUrl,
            };
          }
        });
      setUserDetails(details);
    }
  };

  const checkNickname = async (nickname) => {
    const response = await firestore
      .collection("usersNicknames")
      .doc(nickname)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return false;
        } else {
          setForeingUserEmail(doc.data().userId);
          return true;
        }
      });
    setValidNickanme(response);
    setLoading(false);
  };

  useEffect(() => {
    checkNickname(usernickname);
  }, [usernickname]);

  useEffect(() => {
    getUserDetails(foreingUserEmail);
  }, [foreingUserEmail]);

  useEffect(() => {
    const userTweetsFilter = tweets.filter(
      (tweet) => foreingUserEmail === tweet.email
    );
    setUserTweets(userTweetsFilter);
    setTimeout(() => {
      setLoadingTweet(false);
    }, 1000);
  }, [tweets, foreingUserEmail]);

  useEffect(() => {
    if (foreingUserEmail) {
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
              date: doc.data().date,
            };
          });
          setTweets(tweets);
        });
      return () => unsubscribe();
    }
  }, [foreingUserEmail]);

  useEffect(() => {
    if (foreingUserEmail) {
      const getFavTweets = async (userEmail) => {
        const tweetsFav = await firestore
          .collection("users")
          .doc(userEmail)
          .get()
          .then((doc) => {
            if (!doc.exists) return null;
            if (doc.data().fav) return doc.data().fav;
          });
        setFavTweets(tweetsFav);
      };
      getFavTweets(user.email);
    }
  }, [foreingUserEmail, user]);

  const likeTweet = (tweetId, likes = 0) => {
    const newFavTweets = handleLikeTweet(user.email, favTweets, tweetId, likes);
    setFavTweets(newFavTweets);
  };

  return loading ? (
    <div className="foreing-user-spinner-container">
      <Spinner />
    </div>
  ) : validNickname ? (
    <div className="dev-united-app animate__animated animate__fadeIn">
      <div className="user-profile">
        <Link to="/">
          <div className="user-profile-back">
            <img
              className="user-profile-back-icon"
              src={images("./back.svg").default}
              alt=""
            />
            <p className="user-profile-name">{usernickname}</p>
          </div>
        </Link>
      </div>
      <div className="App-form-container">
        <div className="form-container">
          <img
            className="user-profile-dashboard-photo"
            style={{ outline: `5px solid ${userDetails?.color.hex}` }}
            src={userDetails?.photoUrl}
            alt=""
          />
          <p
            className="user-profile-dashboard-name"
            style={{ backgroundColor: `${userDetails?.color.hex}` }}
          >
            {usernickname}
          </p>
        </div>
      </div>
      <div className="tweets-app">
        {loadingTweet ? (
          <Spinner />
        ) : (
          sortTweets?.map((tweet) => (
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
                    <div className="tweet-autor-date">
                      <p
                        className="tweet-author"
                        style={{ backgroundColor: `${userDetails?.color.hex}` }}
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
                        color: `${userDetails?.color.hex}`,
                      }}
                    >
                      {tweet.email}
                    </p>
                  </div>
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
                            userHelpers.isFavTweet(favTweets, tweet.id)
                              ? ""
                              : "_"
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
    </div>
  ) : (
    <AccessDenied />
  );
}
