import { useState, useEffect } from "react";
export default function App() {
  function update() {
    setCount(count + 1);
  }
  console.log("hello world");
  let [count, setCount] = useState(0);
  useEffect(() => {
    console.log("hii babyy");
  },[count]);

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={update}>click here</button>
      <br />
      <br />
      <h2>{count}</h2>
    </>
  );
}
