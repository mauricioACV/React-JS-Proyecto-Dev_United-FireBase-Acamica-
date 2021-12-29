import React from "react";
import DevUnitedHeader from "./DevUnitedHeader";
import DevUnitedFormTweet from "./DevUnitedFormTweet";
import DevUnitedFeed from "./DevUnitedFeed";

export default function DevUnitedApp({ user, favTweets, setFavTweets, userNick, setUserNick, color }) {
  return (
    <div className="dev-united-app">
      <DevUnitedHeader user={user} setUserNick={setUserNick}/>
      <DevUnitedFormTweet user={user} userNick={userNick}/>
      <DevUnitedFeed
        user={user}
        userNick={userNick}
        favTweets={favTweets}
        setFavTweets={setFavTweets}
        color={color}
      />
    </div>
  );
}
