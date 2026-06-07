# React Hook - useRef() 🚀

# What is useRef()?

`useRef` ek React Hook hai jo mutable value ko store karta hai aur **rerender nahi karata**.

Simple:

```text
useState → Store + Rerender

useRef → Store + No Rerender
```

---

# Why useRef?

Suppose hume koi value store karni hai:

- Timer ID
    
- Previous Value
    
- Input Element
    
- DOM Reference
    

Lekin UI update nahi karna.

Solution:

```jsx
useRef()
```

---

# Syntax

```jsx
const ref = useRef(initialValue);
```

Example:

```jsx
const countRef = useRef(0);
```

---

# Access Value

useState:

```jsx
count
```

useRef:

```jsx
ref.current
```

Example:

```jsx
console.log(ref.current);
```

---

# Update Value

```jsx
ref.current++;
```

Allowed.

Aur rerender nahi hota.

---

# Internal Working

Initial:

```text
Memory

{
current:0
}
```

Update:

```jsx
ref.current=5;
```

Memory:

```text
{
current:5
}
```

React:

```text
No Rerender
```

---

# Example

```jsx
import {useRef} from "react";

function App(){

const ref=useRef(0);

function update(){

ref.current++;

console.log(ref.current);

}

return(

<button onClick={update}>
Click
</button>

)

}
```

Output:

```text
1

2

3

4
```

UI:

No Change.

---

# DOM Access

Most Common Use.

Create Ref:

```jsx
const inputRef=useRef();
```

Attach:

```jsx
<input ref={inputRef}/>
```

Access:

```jsx
inputRef.current.focus();
```

---

# Example

```jsx
import {useRef} from "react";

function App(){

const inputRef=useRef();

function focusInput(){

inputRef.current.focus();

}

return(

<>

<input ref={inputRef}/>

<button onClick={focusInput}>
Focus
</button>

</>

)

}
```

---

# Timer Example

Store Timer ID.

```jsx
const timerRef=useRef();

timerRef.current=setInterval(...);

clearInterval(timerRef.current);
```

---

# Previous Value

Store previous state.

Example:

```text
Current=10

Previous=9
```

Can be stored using useRef.

---

# useState vs useRef

|useState|useRef|
|---|---|
|Store Data|Store Data|
|Rerender|No Rerender|
|UI Update|No UI Update|
|setState()|ref.current|

---

# Real Life Analogy

## useState

```text
Marks Changed

↓

Whole Class Knows

↓

Rerender
```

---

## useRef

```text
Personal Diary

↓

Write Data

↓

Nobody Knows

↓

No Rerender
```

---

# Rules

✅ Top Level

✅ Functional Component

❌ Loop

❌ if

❌ while

---

# Common Use Cases

✅ Input Focus

✅ Timer IDs

✅ Store Previous Value

✅ DOM Manipulation

✅ Avoid Unnecessary Rerenders

---

# Interview Questions

## What is useRef?

useRef is a React Hook that stores mutable values that persist across renders without causing rerenders.

---

## Why useRef?

- DOM Access
    
- Store mutable values
    
- Store timer IDs
    
- Store previous values
    

---

## How to access value?

```jsx
ref.current
```

---

# Golden Rule 🚀

```text
Need UI Update?

↓

YES

↓

useState

----------------

Need Storage Only?

↓

YES

↓

useRef

----------------

Need DOM Access?

↓

useRef

----------------

Need Timer ID?

↓

useRef

----------------

Need Previous Value?

↓

useRef
```

# Easy Memory Trick

```text
useState

↓

Store + Rerender

----------------

useRef

↓

Store + No Rerender

----------------

ref.current

↓

Access Value

----------------

inputRef.current.focus()

↓

DOM Access
```

