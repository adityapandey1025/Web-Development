import React, { useState,useContext } from 'react'
import UserContext from '../Context/UserContext'
function Login() {

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    const {setUser}=useContext(UserContext)

    function handleClick(){
        setUser({username,password})
    }

    return (
        <div>
            <input type="text" placeholder='username' 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input type="password" placeholder='password' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleClick}>Submit</button>

        </div>
    )
}

export default Login
