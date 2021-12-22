import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Login from "./Components/Login";
import DevUnitedApp from "./Components/DevUnitedApp";
import { firestore, auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if(user) {
        const tweetsFav = firestore.collection("users").doc(user.email);
        tweetsFav.get().then((doc) => {
          if (!doc.exists) {
            firestore
              .collection("users")
              .doc(user.email)
              .set({ photoUrl: user.photoURL });
          }
        });
      }
      setFavTweets([]);
    });
  }, [user]);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => {
          return user ? (
            <DevUnitedApp
              user={user}
              favTweets={favTweets}
              setFavTweets={setFavTweets}
            />
          ) : (
            <Login />
          );
        }}
      />
    </div>
  );
}

export default App;
