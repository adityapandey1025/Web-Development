import React from 'react'
import useTodo from '../context/UseTodo';
import { useState } from 'react';
import './item.css'



function Item() {
    const {todos,setTodos}=useTodo();
    const [editingId,setEditingId]=useState(null)
    const [editText,setEditText]=useState('')
    
    
    return (
        <ul>
        {todos.map((todo)=>{
            return (
                <li key={todo.id} className='listItems'>
                    <input type="checkbox" name="" id="" 
                    checked={todo.completed}
                    onChange={()=>{
                        setTodos(prev=>{
                            return(
                                prev.map((item)=>{
                                    if(todo.id===item.id){
                                        return {...item ,completed:!item.completed}
                                    }
                                    return item;
                                })
                            )
                        })
                    }}
                    />
                    
                    
                    {
                        todo.id===editingId ? 
                        <input type="text" name="" id="" 
                        value={editText}
                        onChange={(e)=>{
                            setEditText(e.target.value);
                        }}
                        />
                        :
                        <p
                            style={{
                            textDecoration:
                            todo.completed
                            ?
                            "line-through"
                            :
                            "none"
                            }}
                            >
                            {todo.text}
</p>
                    }

                    {
                        todo.id===editingId ? 
                        <button className='edit' onClick={()=>{
                        setTodos((prev)=>{
                            return(
                                prev.map((item)=>{
                                    if(item.id===todo.id){
                                        return{
                                            ...item,text:editText.trim()}
                                        
                                    }
                                    return item;
                                })
                            )
                        });
                        setEditText('');
                        setEditingId(null);
                    }}>💾</button>
                        :
                        <button className='edit' onClick={()=>{
                        setEditingId(todo.id);
                        setEditText(todo.text);
                    }}>✏️</button>
                    }

                    <button  onClick={()=>{
                        setTodos((prev)=>{
                            return(
                                prev.filter((item)=>{
                                    return item.id!==todo.id;
                                })
                            )
                        })
                    }}>X</button>
                </li>
            )
            
        })}
        </ul>
    )
}

export default Item;
