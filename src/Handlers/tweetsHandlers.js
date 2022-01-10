import tweetsHelper from "../Helpers/tweetsHelpers";
import userHelpers from "../Helpers/userHelpers";

export const handleLikeTweet = (userEmail, favTweets, tweetId, likes = 0) => {
  if (favTweets.length) {
    if (userHelpers.isFavTweet(favTweets, tweetId)) {
      const newFavTweets = tweetsHelper.dislike(
        userEmail,
        favTweets,
        tweetId,
        likes
      );
      userHelpers.updateFavTweets(userEmail, newFavTweets);
      return newFavTweets;
    } else {
      const newFavTweets = tweetsHelper.like(
        userEmail,
        favTweets,
        tweetId,
        likes
      );
      userHelpers.updateFavTweets(userEmail, newFavTweets);
      return newFavTweets;
    }
  } else {
    const newFavTweets = tweetsHelper.firstLikeEver(userEmail, tweetId, likes);
    userHelpers.updateFavTweets(userEmail, newFavTweets);
    return newFavTweets;
  }
};
