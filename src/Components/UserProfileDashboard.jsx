import React from "react";

export default function UserProfileDashboard({ user }) {
  return (
    <div className="App-form-container">
      <div className="form-container">
        <img
          className="user-profile-dashboard-photo"
          src={user.photoURL}
          alt=""
        />
        <p className="user-profile-dashboard-name">USERNAME</p>
        <div className="user-profile-dashboard-options">
          <p className="user-profile-options-style dummy-style">POSTS</p>
          <p className="user-profile-options-style">FAVORITES</p>
        </div>
      </div>
    </div>
  );
}
