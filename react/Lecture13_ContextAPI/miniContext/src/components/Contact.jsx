import React, { useContext } from 'react'
import { useState } from 'react'
import UserContext from '../Context/UserContext'

function Contact() {
    const name=useContext(UserContext)
    return (
        <div>
            <h1>Contact Page</h1>
            <h2>Owner is {name}</h2>
        </div>
    )
}

export default Contact
