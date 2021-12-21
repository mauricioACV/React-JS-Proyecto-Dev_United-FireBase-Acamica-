import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Login from "./Components/Login";
import DevUnitedApp from "./Components/DevUnitedApp";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
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
