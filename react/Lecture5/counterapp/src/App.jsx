// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   let counter =18;
  
//   const upvalue=()=>{
//     counter ++;
//     console.log("value updated ",Math.random()*100);
//     console.log(counter)

//   }

//   return (
//     <>
//     <h1>Welcome to react series</h1>
//     <h2>Counter Value is {counter}</h2>
//     <br /><br />

//     <button onClick={upvalue}>Up {counter}</button>
//     <br /><br />
//     <button>Down {counter}</button>

//     <footer>
//       <p>{counter}</p>
//       <br /><br />
//     </footer>

//     </>
//   )
// }

// export default App


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let [counter,setCounter]=useState(18);
  const upvalue=()=>{
    if(counter===20){
      alert("Value can go more than 20")
      return;
    }
    counter++;
    console.log(counter);
    setCounter(counter);
  }

  const downvalue=()=>{
    if(counter===0){
      alert("Value can go less than 0")
      return;
    }
    counter--;
    console.log(counter);
    setCounter(counter);
  }


  return (
    <>
    <h1>Welcome to react series</h1>
    <h2>Counter Value is {counter}</h2>
    <br /><br />

    <button onClick={upvalue}>Up {counter}</button>
    <br /><br />
    <button onClick={downvalue}>Down {counter}</button>

    <footer>
      <p>{counter}</p>
      <br /><br />
    </footer>

    </>
  )
}

export default App
