import { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context/ContextProvider.js";
import { firestore, auth } from "./firebase";
import { Route } from "react-router-dom";
import DevUnitedApp from "./Components/DevUnitedApp/DevUnitedApp";
import FrontPageMain from "./Components/FrontPage/FrontPageMain";

function App() {
  const { userNick, setUserNick } = useContext(AppContext);

  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);
  const [userColor, setUserColor] = useState({});

  const handleUserAuthState = (user) => {
    setUser(user);
    if (user) {
      firestore
        .collection("users")
        .doc(user.email)
        .get()
        .then((doc) => {
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
          return user && userNick ? (
            <DevUnitedApp
              user={user}
              favTweets={favTweets}
              setFavTweets={setFavTweets}
              setUserNick={setUserNick}
              userNick={userNick}
              color={userColor}
            />
          ) : (
            <FrontPageMain
              user={user}
              userNick={userNick}
              setUserNick={setUserNick}
              setUserColor={setUserColor}
              userColor={userColor}
            />
          );
        }}
      />
    </div>
  );
}

export default App;
