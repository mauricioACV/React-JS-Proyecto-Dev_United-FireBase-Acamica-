import { useEffect, useState } from "react";
import { firestore, auth } from "./firebase";
import { Route } from "react-router-dom";
import DevUnitedApp from "./Components/DevUnitedApp";
import FrontPageMain from "./Components/FrontPageMain";

function App() {
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);
  const [color, setColor] = useState({});


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
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
          return userName ? (
            <DevUnitedApp
              user={user}
              favTweets={favTweets}
              setFavTweets={setFavTweets}
              setUserName={setUserName}
              color={color}
            />
          ) : (
            <FrontPageMain user={user} setUserName={setUserName} setColor={setColor}/>
          );
        }}
      />
    </div>
  );
}

export default App;
