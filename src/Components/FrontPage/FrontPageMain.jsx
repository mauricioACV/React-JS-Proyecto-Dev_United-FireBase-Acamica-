import React from "react";
import FrontPageLogin from "./FrontPageLogin";
import FrontPageLogo from "./FrontPageLogo";
import FrontPageWelcome from "./FrontPageWelcome";

export default function FrontPageMain({
  user,
  setUserNick,
  loading,
  setUserColor,
  userColor,
}) {
  return (
    <div className="front-page-container">
      <FrontPageLogo />
      {user ? (
        <FrontPageWelcome
          user={user}
          loading={loading}
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
