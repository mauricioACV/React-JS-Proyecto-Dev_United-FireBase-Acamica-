import React from "react";
import UserProfile from "./UserProfile";
import FormNewTweet from "./FormNewTweet";
import TweetsContainer from "./TweetsContainer";

export default function DevUnitedApp({ user, favTweets, setFavTweets }) {
  return (
    <div className="dev-united-app">
      <UserProfile user={user} />
      <FormNewTweet user={user} />
      <TweetsContainer
        user={user}
        favTweets={favTweets}
        setFavTweets={setFavTweets}
      />
    </div>
  );
}
