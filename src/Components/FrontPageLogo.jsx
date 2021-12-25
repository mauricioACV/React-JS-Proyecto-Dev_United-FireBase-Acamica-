import React from "react";

export default function FrontPageLogo() {
  const images = require.context("../imgs/Front_Page", true);
  return (
    <div className="logo-container">
      <img
        src={images("./desk-logo.svg").default}
        className="desk-logo"
        alt=""
      />
    </div>
  );
}
