import React from "react";
import FrontPageLogin from "./FrontPageLogin";
import FrontPageLogo from "./FrontPageLogo";
import FrontPageWelcome from "./FrontPageWelcome";

export default function FrontPageMain({
  user,
  setUserNick,
  setUserColor,
  userColor,
}) {
  return (
    <div className="front-page-container">
      <FrontPageLogo />
      {user ? (
        <FrontPageWelcome
          user={user}
          setUserNick={setUserNick}
          setUserColor={setUserColor}
          userColor={userColor}
        />
      ) : (
        <FrontPageLogin />
      )}
    </div>
  );
}
