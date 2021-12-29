import React from 'react'
import { logout } from "../../firebase"; 

export default function DevUnitedHeader({user, setUserNick}) {

  const images = require.context("../../imgs", true);
  
  const handleLogout = () => {
    // setUserNick(null);
    logout();
  }

    return (
        <div className="user-profile">
          <img className="user-profile-pic" src={user.photoURL} onClick={handleLogout} alt="" />
          <img className="logo_small" src={images("./logo_small.svg").default} alt="" />
          <img className="dev_united_logo" src={images("./dev_united_logo.svg").default} alt="" />
        </div>
    )
}
