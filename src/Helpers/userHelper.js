export const userHasFavTweets = (firestore, user) => {
    firestore.collection("users")
    .doc(user.email)
    .get().then((doc)=>{
      if(!doc.exists){
        return false
      } else {
        return true;
      }
    });
};