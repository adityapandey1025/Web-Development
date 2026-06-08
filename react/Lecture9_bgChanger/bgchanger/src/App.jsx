import Btn from "./components/Btn"
import "./App.css"
import { useState } from "react"

function App(){
  const [color,setColor]=useState("black");
  return(
    <>
    <div className="main" style={{backgroundColor:color}}>
      <div className="container">
            <div className="box">
                <Btn  color="red" text="red" changeColor={setColor}/>
                <Btn  color="green" text="green" changeColor={setColor}/>
                <Btn  color="yellow" text="yellow" changeColor={setColor}/>
                <Btn  color="blue" text="blue" changeColor={setColor}/>
                <Btn  color="black" text="black" changeColor={setColor}/>
                <Btn  color="white" text="white" changeColor={setColor}/>
                <Btn  color="pink" text="pink" changeColor={setColor}/>
                <Btn  color="purple" text="purple" changeColor={setColor}/>
                <Btn  color="olive" text="olive" changeColor={setColor}/>
                <Btn  color="lavender" text="lavender" changeColor={setColor}/>
                <Btn  color="gray" text="gray" changeColor={setColor}/>
            </div>
          </div>
    </div>
    </>
  )
}

export default App
