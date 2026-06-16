import React, { useState } from 'react'
import useTodo from '../context/UseTodo'
import './form.css'

function Form() {
    const {todos,setTodos}=useTodo();
    const [val,setVal]=useState('')
    return (
        <div className='form'>
            <input type="text" id='' 
            placeholder='Write Todo....'
            value={val}
            onChange={(e)=>{
                setVal(e.target.value);
            }}
            />
            <button onClick={()=>{
                if(!val.trim()) return;
                setTodos((prev)=>{
                    return [ ...prev , {
                        id:Date.now(),
                        text:val,
                        completed:false
                } ]
                });
                setVal('');
            }}>Add</button>
        </div>
    )
}

export default Form
