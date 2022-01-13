import React from "react";

export default function UserProfileDashboard({
  user,
  userNick,
  userColor,
  favActive,
  setFavActive,
}) {
  return (
    <div className="App-form-container">
      <div className="form-container">
        <img
          className="user-profile-dashboard-photo"
          style={{ outline: `5px solid ${userColor.hex}` }}
          src={user.photoURL}
          alt=""
        />
        <p
          className="user-profile-dashboard-name"
          style={{ backgroundColor: `${userColor.hex}` }}
        >
          {userNick}
        </p>
        <div className="user-profile-dashboard-options">
          <button
            onClick={() => setFavActive(false)}
            className={`user-profile-options-style ${
              favActive ? "" : "dummy-style"
            }`}
          >
            POSTS
          </button>
          <button
            onClick={() => setFavActive(true)}
            className={`user-profile-options-style ${
              favActive ? "dummy-style" : ""
            }`}
          >
            FAVORITES
          </button>
        </div>
      </div>
    </div>
  );
}
