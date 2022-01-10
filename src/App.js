import { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context/ContextProvider.js";
import { firestore, auth } from "./firebase";
import { Route, Switch } from "react-router-dom";
import DevUnitedApp from "./Components/DevUnitedApp/DevUnitedApp";
import FrontPageMain from "./Components/FrontPage/FrontPageMain";
import UserProfile from "./Components/UserProfile";
import UserProfileForeing from "./Components/UserProfileForeing.jsx";
import AccessDenied from "./Components/AccessDenied.jsx";

function App() {
  const { userNick, setUserNick } = useContext(AppContext);

  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);
  const [userColor, setUserColor] = useState({});
  const getUserNickname = async (email) => {
    const nickname = await firestore
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data().nickname;
        } else {
          return null;
        }
      });
    setUserNick(nickname);
  };

  const getUserColor = async (email) => {
    const color = await firestore
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return { name: doc.data().color.name, hex: doc.data().color.hex };
        } else {
          return {};
        }
      });
    setUserColor(color);
  };

  const saveUserPhoto = async (email, urlPhoto) => {
    await firestore
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          firestore.collection("users").doc(email).set({ photoUrl: urlPhoto });
        }
      });
  };

  const handleUserAuthState = (user=null) => {
    setUser(user);
    if (user!=null) {
      getUserNickname(user.email);
      getUserColor(user.email);
      saveUserPhoto(user.email, user.photoURL);
    }
    setFavTweets([]);
  };

  useEffect(() => {
    auth.onAuthStateChanged(handleUserAuthState);
  }, [user]);

  return (
    <div className="App">
      <Switch>
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
                setUserColor={setUserColor}
                userColor={userColor}
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
        <Route
          exact
          path="/UserProfile/"
          render={() => {
            return user && userNick ? (
              <UserProfile
                user={user}
                userNick={userNick}
                setUserNick={setUserNick}
                setUserColor={setUserColor}
                userColor={userColor}
              />
            ) : (
              <AccessDenied />
            );
          }}
        />
        <Route
          exact
          path="/:usernickname"
          render={() => {
            return user ? (
              <UserProfileForeing
                // user={user}
                // userNick={userNick}
                // setUserNick={setUserNick}
                // setUserColor={setUserColor}
                // userColor={userColor}
              />
            ) : (
              <AccessDenied />
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
