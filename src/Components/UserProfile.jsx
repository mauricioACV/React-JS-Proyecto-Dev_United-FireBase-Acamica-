import React from 'react'
import UserProfileDashboard from './UserProfileDashboard'
import UserProfileHeader from './UserProfileHeader'

export default function UserProfile({user, setUserNick,  setUserColor}) {
    return (
        <div className="dev-united-app">
            <UserProfileHeader user={user} setUserNick={setUserNick} setUserColor={setUserColor} />
            <UserProfileDashboard user={user}/>
        </div>
    )
}
