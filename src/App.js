import { useEffect, useState } from "react";
import { firestore, auth } from "./firebase";
import { Route } from "react-router-dom";
import DevUnitedApp from "./Components/DevUnitedApp";
import FrontPageMain from "./Components/FrontPage/FrontPageMain";

function App() {
  const [userNick, setUserNick] = useState(null);
  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);
  const [userColor, setUserColor] = useState({});

  console.log(userColor);

  const handleUserAuthState = (user) => {
    setUser(user);
    if (user) {
      const userPhoto = firestore.collection("users").doc(user.email);
      userPhoto.get().then((doc) => {
        if (!doc.exists) {
          firestore
            .collection("users")
            .doc(user.email)
            .set({ photoUrl: user.photoURL });
        }
      });
    }
    setFavTweets([]);
    setUserColor({ name: "red", hex: "#F50D5A" });
  };

  useEffect(() => {
    auth.onAuthStateChanged(handleUserAuthState);
  }, [user]);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => {
          return (user && userNick) ? (
            <DevUnitedApp
              user={user}
              favTweets={favTweets}
              setFavTweets={setFavTweets}
              setUserNick={setUserNick}
              userNick={userNick}
              color={userColor}
            />
          ) : (
            <FrontPageMain user={user} setUserNick={setUserNick} setUserColor={setUserColor} userColor={userColor}/>
          );
        }}
      />
    </div>
  );
}

export default App;
