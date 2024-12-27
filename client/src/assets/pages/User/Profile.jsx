import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {currentUser}=useSelector((state)=>state.user)
  return (
    <div>
      <h1>UserProfile</h1>
      <p>`wellcome${currentUser.user.name}`</p>
    </div>
  )
}

export default Profile
