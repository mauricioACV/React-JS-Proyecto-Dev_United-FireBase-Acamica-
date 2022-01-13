import { firestore } from "../firebase";

const tweetsHelper = {
  like: function (userEmail, favTweets, tweetId, likes = 0) {
    const newFavTweets = [...favTweets, tweetId];
    firestore.doc(`tweets/${tweetId}`).update({ likes: likes + 1 });
    return newFavTweets;
  },
  firstLikeEver: function (userEmail, tweetId, likes = 0) {
    firestore.doc(`tweets/${tweetId}`).update({ likes: likes + 1 });
    return [tweetId];
  },
  dislike: function (userEmail, favTweets, tweetId, likes = 0) {
    const favFilter = favTweets.filter((item) => item !== tweetId);
    firestore.doc(`tweets/${tweetId}`).update({ likes: likes - 1 });
    return favFilter;
  },
  delete: function (tweetId) {
    firestore.doc(`tweets/${tweetId}`).delete();
  },
  getFav: async function (userEmail) {
    const tweetsFav = await firestore
      .collection("users")
      .doc(userEmail)
      .get()
      .then((doc) => {
        if (!doc.exists) return null;
        if (doc.data().fav) return doc.data().fav;
      });
    return tweetsFav;
  },
};

export default tweetsHelper;
