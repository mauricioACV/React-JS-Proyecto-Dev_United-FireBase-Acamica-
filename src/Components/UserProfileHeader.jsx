import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebase";

export default function UserProfileHeader({ user, setUserNick, setUserColor }) {
  const images = require.context("../imgs", true);
  const handleLogout = () => {
    setUserNick(null);
    setUserColor({});
    logout();
  };

  return (
    <div className="dev-united-app">
      <div className="user-profile">
        <Link to="/">
          <div className="user-profile-back">
            <img
              className="user-profile-back-icon"
              src={images("./back.svg").default}
              alt=""
            />
            <p className="user-profile-name">USERNAME</p>
          </div>
        </Link>
        <Link to="/">
          <img
            className="logout-icon"
            onClick={handleLogout}
            src={images("./logout.svg").default}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
