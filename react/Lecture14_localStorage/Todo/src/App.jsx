import { useState } from 'react'
import './App.css'
import { TodoProvider } from './context/UseTodo'
import { Form,Item } from './component'


function App() {
  const [todos,setTodos]=useState([])
  return(
    <>
    <TodoProvider value={{todos,setTodos}}>
      <h1 style={{textAlign:'center'}}>Manage Your Todos....</h1>
      <Form />
      <Item />
      </TodoProvider>
    </>
  )
}

export default App
