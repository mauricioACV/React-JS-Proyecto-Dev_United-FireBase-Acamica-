import React, { useState } from "react";
import UserProfileDashboard from "./UserProfileDashboard";
import UserProfileFeed from "./UserProfileFeed";
import UserProfileHeader from "./UserProfileHeader";

export default function UserProfile({
  user,
  userNick,
  setUserNick,
  setUserColor,
  userColor,
}) {
  const [favActive, setFavActive] = useState(false);
  return (
    <div className="dev-united-app">
      <UserProfileHeader
        userNick={userNick}
        setUserNick={setUserNick}
        setUserColor={setUserColor}
      />
      <UserProfileDashboard user={user} userNick={userNick} userColor={userColor} favActive={favActive} setFavActive={setFavActive} />
      <UserProfileFeed user={user} userColor={userColor} favActive={favActive} />
    </div>
  );
}
