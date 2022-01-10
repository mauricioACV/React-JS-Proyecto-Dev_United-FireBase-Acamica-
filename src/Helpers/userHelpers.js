import { firestore } from "../firebase";

const userHelpers = {
  updateFavTweets : function(userEmail, favTweets) {
    firestore.doc(`users/${userEmail}`).update({ fav: favTweets });
  },
  isFavTweet: function(userFavTweets, tweetId) {
    if (userFavTweets) return userFavTweets.includes(tweetId);
    return false;
  },
};

export default userHelpers;