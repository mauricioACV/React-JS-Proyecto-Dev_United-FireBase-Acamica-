import React, { useState } from "react";

export const AppContext = React.createContext();

export default function ContextProvider({ children }) {
  const [userNick, setUserNick] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        userNick,
        setUserNick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
