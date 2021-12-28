import React from "react";
import UserProfile from "./UserProfile";
import FormNewTweet from "./FormNewTweet";
import TweetsContainer from "./TweetsContainer";

export default function DevUnitedApp({ user, favTweets, setFavTweets, userNick, setUserNick, color }) {
  return (
    <div className="dev-united-app">
      <UserProfile user={user} setUserNick={setUserNick}/>
      <FormNewTweet user={user} userNick={userNick}/>
      <TweetsContainer
        user={user}
        userNick={userNick}
        favTweets={favTweets}
        setFavTweets={setFavTweets}
        color={color}
      />
    </div>
  );
}
