import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'

function App() {
 return(
  <>
  <h1 className='text-5xl text-red-500'>Hello World</h1>
  <h2 className='copyright'>@The above content is copyright</h2>
  <p className='text-red-300 p-4 m-3 bg-black flex justify-center align-center'>I am Tailwind </p>


  <Card heroName="Pikachu" price={180} id="434"/>
  <Card heroName="Nobita" price={200} id="548"/>
  </>
 )
}

export default App
