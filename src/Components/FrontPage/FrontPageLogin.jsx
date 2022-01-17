import React from "react";
import { loginWithGoogle } from "../../firebase";
import FrontPageFooter from "./FrontPageFooter";

export default function FrontPageLogin() {
  const images = require.context("../../imgs/Front_Page", true);
  return (
    <div className="login-container">
      <div className="login-container_info">
        <h1 className="login-title animate__animated animate__backInRight">DEVELOPERS SOCIAL NETWORK</h1>
        <h2 className="login-subtitle animate__animated animate__backInRight">
          Comunidad para desarrolladores, comparte tus experiencias!
        </h2>
        <img
          src={images("./login-google.svg").default}
          className="login-google animate__animated animate__backInRight"
          alt=""
          onClick={loginWithGoogle}
        />
        <FrontPageFooter/>
      </div>
    </div>
  );
}