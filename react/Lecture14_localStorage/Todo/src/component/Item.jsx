import React from 'react'
import UseTodo from '../context/UseTodo';

function Item() {
    const {todos,setTodos}=UseTodo();

    function handleDlt(id){
        setTodos((prev)=>{
            return( prev.filter((item)=>{
                return (item.id!=id)
            }))
        })
    }

    return (
        <ul>
            {
                todos.map((todo)=>{
                   return ( <li key={todo.id} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                    <p id="text">{todo.text}</p>

                    <button onClick={()=>handleDlt(todo.id)}>X</button>

                   </li>)

                })
            }
        </ul>
    )
}

export default Item
