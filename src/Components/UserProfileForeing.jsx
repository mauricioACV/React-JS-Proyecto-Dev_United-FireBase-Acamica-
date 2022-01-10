import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserProfileForeing({user}) {
  const images = require.context("../imgs", true);
  const params = useParams();
  const { usernickname } = params;

  const [validNickname, setValidNickanme] = useState(false);
  const [foreingUserEmail, setForeingUserEmail] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [userTweets, setUserTweets] = useState([]);
  const [favTweets, setFavTweets] = useState(null);

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

  const isFavTweet = (tweetId) => {
    if (favTweets) {
      return favTweets.includes(tweetId);
    }
    return false;
  };

  return validNickname && (
    <div className="dev-united-app">
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
        {userTweets?.map((tweet) => (
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
                    style={{ backgroundColor: `${userDetails?.color.hex}` }}
                  >
                    {tweet.nickname}
                  </p>
                  &nbsp;
                  <p className="tweet-date">- 5 jun.</p>
                </div>
              </div>
              <div className="tweet-message">
                <p className="font-style-tweet">{tweet.tweet}</p>
              </div>
              <div className="buttons-tweets-container">
                <div className="likes-container">
                  <img
                    src={
                      images(`./corazon${isFavTweet(tweet.id) ? "" : "_"}.svg`)
                        .default
                    }
                    className="like-icon like-item"
                    alt=""
                  />
                  <p className="like-count">{tweet.likes || ""}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
