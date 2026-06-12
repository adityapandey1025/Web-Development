import { useState } from 'react'
import './App.css'
import { Home,About,Contact } from './components'

import UserContextProvider from './Context/UserContextProvider'

function App() {
 

  return (
    <>
    <UserContextProvider >
      <Home />
      <About />
      <Contact />
    </UserContextProvider>
    </>
  )
}

export default App
