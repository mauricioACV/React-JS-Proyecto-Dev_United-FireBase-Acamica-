import React from "react";
import { Link } from "react-router-dom";

export default function DevUnitedHeader({ user }) {
  const images = require.context("../../imgs", true);

  return (
    <div className="user-profile">
      <Link to="/UserProfile">
        <img
          className="user-profile-pic"
          src={user.photoURL}
          alt=""
        />
      </Link>
      <img
        className="logo_small"
        src={images("./logo_small.svg").default}
        alt=""
      />
      <img
        className="dev_united_logo"
        src={images("./dev_united_logo.svg").default}
        alt=""
      />
    </div>
  );
}
