```js
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let counter =18;
  
  const upvalue=()=>{
    counter ++;
    console.log("value updated ",Math.random()*100);
    console.log(counter)

  }

  return (
    <>
    <h1>Welcome to react series</h1>
    <h2>Counter Value is {counter}</h2>
    <br /><br />

    <button onClick={upvalue}>Up {counter}</button>
    <br /><br />
    <button>Down {counter}</button>

    <footer>
      <p>{counter}</p>
      <br /><br />
    </footer>

    </>
  )
}

export default App

```

**The Above code changes the value of counter but it doesnt reflect the changes to UI. I have to manually update all the places where counter value increase by using addEventListner property and click argument**

**To resolve this , we need concept of Hooks**
```js
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

```

# React Hooks - Short Hinglish Notes 🚀

## What are Hooks?

Hooks React ke special built-in functions hain jo Functional Components ko React ki internal features use karne dete hain.

Examples:

- State
    
- Lifecycle
    
- Context
    
- DOM Access
    

React 16.8 se pehle ye features sirf Class Components me available the.

---

# Why Hooks?

Problem:

```jsx
let count = 0;
```

React rerender hone par:

```text
App()
↓
count = 0
↓
Click
↓
App()
↓
count = 0
```

Variable ki value reset ho jati hai.

Solution:

React Hooks.

Hooks React ki memory use karte hain.

---

# Most Important Hooks

## 1. useState()

Data store karta hai.

```jsx
const [count, setCount] = useState(0);
```

Example:

- Counter
    
- Dark Mode
    
- Login State
    

---

## 2. useEffect()

Side Effects handle karta hai.

Use Cases:

- API Call
    
- Timer
    
- Event Listener
    

```jsx
useEffect(()=>{
console.log("Loaded");
},[]);
```

---

## 3. useRef()

DOM ko directly access karta hai.

Example:

- Input Focus
    
- OTP Input
    

```jsx
const inputRef = useRef();
```

---

## 4. useContext()

Shared Data access karta hai.

Problem:  
Prop Drilling.

Solution:

```text
Theme

↙ ↓ ↘

Home Profile Settings
```

---

## 5. useMemo()

Heavy calculations cache karta hai.

```text
Calculate Once
↓
Store
↓
Reuse
```

---

## 6. useCallback()

Functions ko cache karta hai.

Extra rerenders ko reduce karta hai.

---

## 7. Custom Hooks

Apni reusable logic likh sakte hain.

Examples:

```text
useFetch()
useTheme()
useCounter()
```

---

# Rules of Hooks

✅ Top Level par call karo.

❌ Loop ya if ke andar mat call karo.

✅ Functional Component ya Custom Hook ke andar hi use karo.

---

# Easy Memory Trick 🚀

```text
useState    → Save Data

useEffect   → Do Something

useRef      → Access DOM

useContext  → Share Data

useMemo     → Save Calculation

useCallback → Save Function

Custom Hook → Reuse Logic
```

---

# Interview Definition

**Hooks are special built-in React functions that allow Functional Components to use React features like State, Lifecycle, Context, and Refs without using Class Components.**





