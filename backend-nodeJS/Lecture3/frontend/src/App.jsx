import { useState,useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import axios from 'axios'
import './App.css'


function App() {
  const [jokes,setJokes]=useState([]);
  useEffect(()=>{
    axios.get('/api/jokes')
      .then(res=>setJokes(res.data))
      .catch(err=>console.log(err))
  },[])

  return (
    <>
    <h1>Code aur Full Stack</h1>
    <h2>{jokes.length}</h2>
    {
      jokes.map((joke,index)=>{
        return (
        <div key={index}>
          <h2>{joke.title}</h2>
          <p>{joke.jokes}</p>
        </div> )
      })
    }
    </>
  )
}

export default App
