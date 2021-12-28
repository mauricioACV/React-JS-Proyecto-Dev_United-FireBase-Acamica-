import React from "react";
import { loginWithGoogle } from "../../firebase";
import FrontPageFooter from "./FrontPageFooter";

export default function FrontPageLogin() {
  const images = require.context("../../imgs/Front_Page", true);
  return (
    <div className="login-container">
      <div className="login-container_info">
        <h1 className="login-title">LOREM IPSUM DOLOR</h1>
        <h2 className="login-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h2>
        <img
          src={images("./login-google.svg").default}
          className="login-google"
          alt=""
          onClick={loginWithGoogle}
        />
        <FrontPageFooter/>
      </div>
    </div>
  );
}
