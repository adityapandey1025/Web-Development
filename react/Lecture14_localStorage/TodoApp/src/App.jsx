import React, { useEffect, useState } from 'react'
import './App.css'
import { Form,Item } from '../components'
import { TodoProvider } from '../context/UseTodo'


function App() {
  const [todos,setTodos]=useState(()=>{
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])
  

  return (
    <>
    <TodoProvider value={{todos,setTodos}}>
      <h1 style={{margin:'0 auto',textAlign:'center'}}>Manage Your Todos</h1>
      <Form />
      <Item />
      </TodoProvider>
     </>
  )
}

export default App
