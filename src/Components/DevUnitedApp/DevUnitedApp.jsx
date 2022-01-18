import { useContext } from "react";
import { AppContext } from "../../Context/ContextProvider";
import DevUnitedHeader from "./DevUnitedHeader";
import DevUnitedFormTweet from "./DevUnitedFormTweet";
import DevUnitedFeed from "./DevUnitedFeed";

export default function DevUnitedApp() {
  const { user, userNick, favTweets, setFavTweets, userColor } = useContext(AppContext);
  return (
    <div className="dev-united-app">
      <DevUnitedHeader user={user} />
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
