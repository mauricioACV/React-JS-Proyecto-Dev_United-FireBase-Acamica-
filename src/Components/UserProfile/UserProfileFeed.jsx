import { useTweets } from "../../Hooks/useTweets";
import UserProfileFavTweets from "./UserProfileFavTweets";
import UserProfileTweets from "./UserProfileTweets";

export default function UserProfileFeed({ user, userColor, userNick, favActive }) {

  const {tweets, loading} = useTweets(user);

  return (
    <div className="tweets-app animate__animated animate__fadeIn">
      {favActive ? (
        <UserProfileFavTweets user={user} tweets={tweets} userColor={userColor} userNick={userNick} />
      ) : (
        <UserProfileTweets user={user} userColor={userColor} tweets={tweets} loading={loading} />
      )}
    </div>
  );
}
