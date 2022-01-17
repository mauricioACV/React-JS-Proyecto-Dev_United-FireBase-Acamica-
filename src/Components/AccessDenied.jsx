import React from "react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  const images = require.context("../imgs", true);

  return (
    <div className="access-denied">
      <img
        className="not-found-img"
        src={images("./not-found.svg").default}
        alt="not found"
      />
      <Link to="/">Lo sentimos :( esta operación no es válida!</Link>
      <Link to="/">
        <div className="back-home-container">
          <img
            className="user-profile-back-icon"
            src={images("./back.svg").default}
            alt=""
          />
          <p className="back-home-text">Volver al Home</p>
        </div>
      </Link>
    </div>
  );
}
