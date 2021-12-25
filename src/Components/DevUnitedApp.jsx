import React from "react";
import UserProfile from "./UserProfile";
import FormNewTweet from "./FormNewTweet";
import TweetsContainer from "./TweetsContainer";

export default function DevUnitedApp({ user, favTweets, setFavTweets, setUserName, color }) {
  return (
    <div className="dev-united-app">
      <UserProfile user={user} setUserName={setUserName}/>
      <FormNewTweet user={user} />
      <TweetsContainer
        user={user}
        favTweets={favTweets}
        setFavTweets={setFavTweets}
        color={color}
      />
    </div>
  );
}
