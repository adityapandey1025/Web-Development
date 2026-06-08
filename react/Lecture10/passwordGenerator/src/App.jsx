import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [len,setLen]=useState(12);
  const [numAllowed,setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("Random Password");
  

  let [copy,setCopy]=useState("copy")

  useEffect(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+= "0123456789"
    if(charAllowed) str+= "@#%^&*()?<>}{:'~!";

    for(let i=1;i<=len;i++){
      let idx=Math.floor(Math.random()*str.length);
      pass += str.charAt(idx);
    }

    setPassword(pass);

  },[len,numAllowed,charAllowed])
  
  return(
    <>
    <div className="main">
        <div className="box">
          <div className="upper">
            <p id="password">{password}</p>
            <p id={copy} onClick={()=>{
              navigator.clipboard.writeText(password);
              setCopy("copied");
              setTimeout(()=>setCopy("copy"),3000);
              
            }}>{copy}</p>
          </div>
          <div className="lower">
            <input type="range" name="slider" id="slider" min="4" max="30" value={len} onChange={(e)=>setLen(e.target.value)} />
            <p id="length">Length ({len})</p>
            <input type="checkbox" name="num" id="num" checked={numAllowed} onChange={()=>setNumAllowed(prev=>!prev)}/>
            <label htmlFor="num">Numbers</label>
            <input type="checkbox" name="char" id="char" checked={charAllowed} onChange={()=>setCharAllowed(prev=>!prev)} />
            <label htmlFor="char">Characters</label>
            

          </div>
        </div>
    </div>
    </>
  )
}

export default App
