import React from 'react'
import { useContext } from 'react'
import UserContext from '../Context/UserContext'

function Profile() {
    const {user}=useContext(UserContext);
    
    if(!user){
        return <h1>Please Login first</h1>
    }
    return <div>Welcome {user.username } and ur password is {user.password}</div>
}

export default Profile;
