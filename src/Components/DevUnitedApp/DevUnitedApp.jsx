import React from "react";

import DevUnitedHeader from "./DevUnitedHeader";
import DevUnitedFormTweet from "./DevUnitedFormTweet";
import DevUnitedFeed from "./DevUnitedFeed";

export default function DevUnitedApp({
  user,
  favTweets,
  setFavTweets,
  userNick,
  setUserNick,
  setUserColor,
  userColor,
}) {
  return (
    <div className="dev-united-app">
      <DevUnitedHeader
        user={user}
        setUserNick={setUserNick}
        setUserColor={setUserColor}
      />
      <DevUnitedFormTweet user={user} userNick={userNick} />
      <DevUnitedFeed
        user={user}
        userNick={userNick}
        favTweets={favTweets}
        setFavTweets={setFavTweets}
        userColor={userColor}
      />
    </div>
  );
}
