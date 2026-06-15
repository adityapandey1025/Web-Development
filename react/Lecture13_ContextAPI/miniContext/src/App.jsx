import { useState } from 'react'
import './App.css'
import {Login,Profile} from './components'

import UserContextProvider from './Context/UserContextProvider'

function App() {
 

  return (
    <>
    <UserContextProvider >
      <Login />
      <Profile />
    </UserContextProvider>
    </>
  )
}

export default App
