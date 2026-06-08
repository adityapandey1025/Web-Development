import React from 'react';


export default function Btn({color,text,changeColor}){
    function handleClick(){
        changeColor(color);
        console.log("clicked");
        console.log(color);
    }
    return(
        <button onClick={handleClick} className='myBtn' style={{backgroundColor:color,color:(text==="white")?"black":"white"}}>{text}</button>
    )
}