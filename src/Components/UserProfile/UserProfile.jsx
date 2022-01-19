import { useState, useContext } from "react";
import { AppContext } from "../../Context/ContextProvider";
import UserProfileDashboard from "./UserProfileDashboard";
import UserProfileFeed from "./UserProfileFeed";
import UserProfileHeader from "./UserProfileHeader";

export default function UserProfile() {
  const { user, setUser, userNick, setUserNick, userColor, setUserColor } = useContext(AppContext);
  const [favActive, setFavActive] = useState(false);
  return (
    <div className="dev-united-app animate__animated animate__fadeIn">
      <UserProfileHeader
        userNick={userNick}
        setUserNick={setUserNick}
        setUserColor={setUserColor}
        setUser={setUser}
      />
      <UserProfileDashboard user={user} userNick={userNick} userColor={userColor} favActive={favActive} setFavActive={setFavActive} />
      <UserProfileFeed user={user} userColor={userColor} favActive={favActive} userNick={userNick} />
    </div>
  );
}
