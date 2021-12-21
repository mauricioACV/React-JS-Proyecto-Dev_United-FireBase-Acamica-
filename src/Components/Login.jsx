import React from "react";
import { loginWithGoogle } from "../firebase";

export default function Login() {
  const images = require.context("../imgs/Front_Page", true);

  return (
    <div className="front-page-container">
      <div className="logo-container">
        <img
          src={images("./desk-logo.svg").default}
          className="desk-logo"
          alt=""
        />
      </div>
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
          <footer className="login-footer">
            <p className="login-copyright">© 2021 Devs_United - </p>
            &nbsp;
            <p className="login-version-app">BETA</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
