import { firestore } from "../firebase";

const userHelpers = {
  updateFavTweets: function (userEmail, favTweets) {
    firestore.doc(`users/${userEmail}`).update({ fav: favTweets });
  },
  saveUserPhoto: function (userEmail, urlPhoto) {
    firestore
      .collection("users")
      .doc(userEmail)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          firestore
            .collection("users")
            .doc(userEmail)
            .set({ photoUrl: urlPhoto });
        }
      });
  },
  getUserColor: async function (userEmail) {
    const color = await firestore
      .collection("users")
      .doc(userEmail)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return { name: doc.data().color.name, hex: doc.data().color.hex };
        } else {
          return {};
        }
      });
    return color;
  },
  getUserNickname: async function (userEmail) {
    const nickname = await firestore
      .collection("users")
      .doc(userEmail)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data().nickname;
        } else {
          return null;
        }
      });
    return nickname;
  },
  isFavTweet: function (userFavTweets, tweetId) {
    if (userFavTweets) return userFavTweets.includes(tweetId);
    return false;
  },
};

export default userHelpers;
