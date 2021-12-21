import React from 'react'
import { logout } from "../firebase";

export default function UserProfile({user}) {
    return (
        <div className="user-profile">
          <img className="user-profile-pic" src={user.photoURL} alt="" />
          <p>¡Hola {user.displayName}!</p>
          <button onClick={logout}>Log out</button>
        </div>
    )
}
