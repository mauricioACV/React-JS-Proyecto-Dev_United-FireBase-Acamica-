import React from "react";

export default function FrontPageFooter() {
  return (
    <footer className="login-footer">
      <p className="login-copyright animate__animated animate__backInRight">© {new Date().getFullYear()} Devs_United - </p>
      &nbsp;
      <p className="login-version-app animate__animated animate__backInRight">BETA</p>
    </footer>
  );
}
