import React from "react";
import FrontPageLogin from "./FrontPageLogin";
import FrontPageLogo from "./FrontPageLogo";
import FrontPageWelcome from "./FrontPageWelcome";

export default function FrontPageMain({ user, setUserName, setColor }) {
  return (
    <div className="front-page-container">
      <FrontPageLogo />
      {user ? <FrontPageWelcome user={user} setUserName={setUserName} setColor={setColor} /> : <FrontPageLogin />}
    </div>
  );
}
