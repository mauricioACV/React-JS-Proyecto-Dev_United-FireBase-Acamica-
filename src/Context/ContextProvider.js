import React, { useState } from "react";

export const AppContext = React.createContext();

export default function ContextProvider({ children }) {
  const [userNick, setUserNick] = useState(null);

  return (
    <AppContext.Provider
      value={{
        userNick,
        setUserNick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
