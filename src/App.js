import { useEffect, useContext } from "react";
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
  const {
    user,
    setUser,
    userNick,
    setUserNick,
    setFavTweets,
    setUserColor,
    setLoading,
  } = useContext(AppContext);

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
            return user && userNick ? <DevUnitedApp /> : <FrontPageMain />;
          }}
        />
        <Route
          exact
          path="/UserProfile/"
          render={() => {
            return user && userNick ? <UserProfile /> : <AccessDenied />;
          }}
        />
        <Route
          exact
          path="/:usernickname"
          render={() => {
            return user ? <UserProfileForeing /> : <AccessDenied />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
