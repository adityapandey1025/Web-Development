import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import './Item.css'
import { removeTodo,toggleTodo,saveTodo } from '../feature/Todo/TodoSlice';

function Item() {
    const todos=useSelector(state=>state.todo);

    const dispatch=useDispatch();

    const [editingId,setEditingId]=useState('');
    const [editingText,setEditingText]=useState('');

    function handleRemove(id){
        dispatch(removeTodo(id));
    }
    
    function handleToggle(id){
        dispatch(toggleTodo(id))
    }

    function handleEdit(id,text){
        setEditingId(id);
        setEditingText(text);
    }

    function handleSave(id,text){
        dispatch(saveTodo({id,text}));
        setEditingId('');
        setEditingText('');
    }

    return (
        <ul>
            {todos.map((todo)=>{
                return(

                    <li key={todo.id} style={{display:'flex',justifyContent:'space-between'}}>

                        <input type="checkbox" name="" id="" 
                        checked={todo.completed}
                        onChange={()=>{
                            handleToggle(todo.id);
                        }}
                        />

                    

                        {
                            editingId===todo.id ?
                            <input type="text" name="" id=""
                            value={editingText}
                            onChange={(e)=>{
                                setEditingText(e.target.value);
                            }}
                            />
                            :
                             <p id="text" style={{ textDecoration:todo.completed?"line-through":"none"}}>{todo.text}</p>

                        }

                        {
                            editingId===todo.id ?
                            <button onClick={()=>{
                                if(!editingText.trim()) return;
                                handleSave(todo.id,editingText);
                            }}>💾</button>
                            :
                            <button onClick={()=>{
                                handleEdit(todo.id,todo.text)
                            }}>✏️</button>


                        }

                        <button onClick={()=>handleRemove(todo.id)}>🗑</button>


                    </li>

                )
            })
        }
        </ul>
    )
}

export default Item
