import React, { useState } from "react";

export const AppContext = React.createContext();

export default function ContextProvider({ children }) {
  const [userNick, setUserNick] = useState(null);
  const [user, setUser] = useState(null);
  const [favTweets, setFavTweets] = useState([]);
  const [userColor, setUserColor] = useState({});
  const [loading, setLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userNick,
        setUserNick,
        favTweets,
        setFavTweets,
        userColor,
        setUserColor,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
