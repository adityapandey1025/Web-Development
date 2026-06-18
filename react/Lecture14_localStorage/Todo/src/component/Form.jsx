import React, { useState } from 'react'
import UseTodo from '../context/UseTodo'

function Form() {
    const {setTodos}=UseTodo();
    const [val,setVal]=useState('')

    function handleClick(){
        if(!val.trim()) return;
        setTodos((prev)=>{
            return [...prev,{
                id:Date.now(),
                text:val,
                completed:false
            }]
        })
        setVal('')
        
    }

    return (
        <div className='form'>
            <input type="text" name="" id="" 
            value={val}
            onChange={(e)=>{
                setVal(e.target.value);
            }}
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    handleClick();
                }
            }}
            />

            <button onClick={handleClick}>Add</button>

        </div>
    )
}

export default Form
