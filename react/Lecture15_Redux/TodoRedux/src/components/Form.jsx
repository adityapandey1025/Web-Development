import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../feature/Todo/TodoSlice';
import './Form.css'



function Form() {
    const dispatch=useDispatch();
    const [val,setVal]=useState('')

    function handleSubmit(){
        if(!val.trim()) return;
        dispatch(addTodo(val.trim()))
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
                if(e.key==='Enter') handleSubmit();
            }}
            />

            <button onClick={handleSubmit} 
            >Add</button>

        </div>
    )
}

export default Form;
