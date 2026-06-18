import { useEffect, useState } from 'react'
import './App.css'
import { Form,Item } from './components';
import { useSelector } from 'react-redux';


function App() {
  const todos=useSelector(state=>state.todo)

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])
 

  return (
    <>
    <h1 style={{textAlign:'center'}}>Manange Your Todos...</h1>
    <Form />
    <Item />

    </>
  )
}

export default App;
