# React Hooks - Correct Hinglish Notes 🚀

## Problem: Normal Variable UI Update Kyu Nahi Karta?

Example:

```jsx
function App() {
  let counter = 18;

  const upvalue = () => {
    counter++;
    console.log(counter);
  };

  return (
    <>
      <h2>Counter Value is {counter}</h2>
      <button onClick={upvalue}>Up</button>
    </>
  );
}
```

### Kya Hoga?

Button click karne par:

```text
19
20
21
22
...
```

Console me values increase hongi.

Lekin UI me hamesha:

```text
Counter Value is 18
```

dikhega.

### Why?

React sirf normal JavaScript variable change hone par rerender nahi karta.

```jsx
counter++;
```

Ye variable ki value to change karta hai, lekin React ko nahi batata ki UI update karni hai.

Isliye:

- Variable update hota hai.
    
- Console me nayi value dikhti hai.
    
- UI update nahi hoti.
    

---

## Kya React Har Click Par App() Dobara Run Karta Hai?

Nahi.

Ye bahut common misconception hai.

Normal variable update karne se:

```jsx
counter++;
```

React rerender nahi karta.

Isliye App() dobara execute bhi nahi hota.

React component tab rerender hota hai jab:

- State change ho
    
- Props change ho
    
- Parent component rerender ho
    
- Context value change ho
    

---

## Solution: useState Hook

React ko UI update karne ke liye state use karte hain.

```jsx
const [counter, setCounter] = useState(18);
```

Ab:

```jsx
setCounter(19);
```

React ko signal deta hai:

```text
State Changed
↓
React Rerender
↓
UI Updated
```

---

## Correct Counter Example

```jsx
function App() {
  const [counter, setCounter] = useState(18);

  const upvalue = () => {
    if (counter === 20) {
      alert("Value cannot be more than 20");
      return;
    }

    setCounter(counter + 1);
  };

  const downvalue = () => {
    if (counter === 0) {
      alert("Value cannot be less than 0");
      return;
    }

    setCounter(counter - 1);
  };

  return (
    <>
      <h2>Counter Value is {counter}</h2>

      <button onClick={upvalue}>
        Up
      </button>

      <button onClick={downvalue}>
        Down
      </button>
    </>
  );
}
```

---

# What are Hooks?

Hooks React ke special built-in functions hain jo Functional Components ko React features use karne dete hain.

Examples:

- State
    
- Lifecycle Features
    
- Context
    
- Refs
    

React 16.8 se pehle ye features mostly Class Components me use kiye jaate the.

---

# Most Important Hooks

## 1. useState()

Component state ko store aur update karta hai.

```jsx
const [count, setCount] = useState(0);
```

Use Cases:

- Counter
    
- Dark Mode
    
- Login State
    
- Form Inputs
    

---

## 2. useEffect()

Side Effects handle karta hai.

Examples:

- API Calls
    
- Timers
    
- Event Listeners
    
- Subscriptions
    

```jsx
useEffect(() => {
  console.log("Component Mounted");
}, []);
```

---

## 3. useRef()

Value ko rerender ke bina store karta hai aur DOM access deta hai.

```jsx
const inputRef = useRef(null);
```

Use Cases:

- Focus Input
    
- Scroll Position
    
- Previous Values
    

---

## 4. useContext()

Multiple components ke beech data share karta hai.

Prop Drilling avoid karta hai.

```text
Theme Context
      ↓
Home Profile Settings
```

---

## 5. useMemo()

Expensive calculations ko memoize karta hai.

```jsx
const result = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

---

## 6. useCallback()

Function reference ko memoize karta hai.

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

## 7. Custom Hooks

Reusable logic create karne ke liye.

Examples:

```text
useFetch()
useCounter()
useTheme()
useAuth()
```

---

# Rules of Hooks

✅ Top level par call karo.

❌ Loop ke andar mat call karo.

❌ if condition ke andar mat call karo.

❌ Nested function ke andar mat call karo.

✅ Functional Component ya Custom Hook ke andar hi call karo.

---

# Easy Memory Trick 🚀

```text
useState    → Store State

useEffect   → Side Effects

useRef      → DOM / Mutable Value

useContext  → Share Data

useMemo     → Cache Calculation

useCallback → Cache Function

Custom Hook → Reuse Logic
```

---

# Interview Definition

Hooks are special built-in React functions that allow Functional Components to use React features such as State, Effects, Context, and Refs without using Class Components.