import UserContext from './UserContext'

import React from 'react'

function UserContextProvider({children}) {
    const user='Aditya'
    return (
        <>
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
        </>
    )
}

export default UserContextProvider
