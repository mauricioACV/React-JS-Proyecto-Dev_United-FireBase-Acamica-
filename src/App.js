import { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context/ContextProvider.js";
import { auth } from "./firebase";
import { Route, Switch } from "react-router-dom";
import userHelpers from "./Helpers/userHelpers";
import DevUnitedApp from "./Components/DevUnitedApp/DevUnitedApp";
import FrontPageMain from "./Components/FrontPage/FrontPageMain";
import UserProfile from "./Components/UserProfile/UserProfile";
import UserProfileForeing from "./Components/UserProfile/UserProfileForeing.jsx";
import AccessDenied from "./Components/AccessDenied.jsx";

function App() {
  const { user, setUser, userNick, setUserNick } = useContext(AppContext);

  const [favTweets, setFavTweets] = useState([]);
  const [userColor, setUserColor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      userHelpers
        .getUserNickname(user.email)
        .then((nickname) => setUserNick(nickname));
      userHelpers.getUserColor(user.email).then((color) => setUserColor(color));
      userHelpers.saveUserPhoto(user.email, user.photoURL);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(true);
    setFavTweets([]);
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
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
                loading={loading}
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
            return user ? <UserProfileForeing user={user} /> : <AccessDenied />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
