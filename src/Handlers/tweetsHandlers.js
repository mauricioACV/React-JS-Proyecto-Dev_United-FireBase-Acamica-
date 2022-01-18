import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import tweetsHelper from "../Helpers/tweetsHelpers";
import userHelpers from "../Helpers/userHelpers";

export const handleLikeTweet = (
  userEmail,
  favTweets = [],
  tweetId,
  likes = 0
) => {
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
        favTweets,
        tweetId,
        likes
      );
      userHelpers.updateFavTweets(userEmail, newFavTweets);
      return newFavTweets;
    }
  } else {
    const newFavTweets = tweetsHelper.firstLikeEver(tweetId, likes);
    userHelpers.updateFavTweets(userEmail, newFavTweets);
    return newFavTweets;
  }
};

export const handleDelete = (tweetId) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: "¿Estas seguro?",
    text: "El post se eliminará sin posiblidad de volver atrás!",
    color: "#fff",
    background: "#150714",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#173b9c",
    cancelButtonColor: "#F50D5A",
    confirmButtonText: "Si, elimínalo!",
    cancelButtonText: "No, me arrepentí!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Eliminado!",
        text: "El post es parte del pasado",
        color: "#fff",
        background: "#150714",
      });
      tweetsHelper.delete(tweetId);
    }
  });
};
