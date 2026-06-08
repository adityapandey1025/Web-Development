# React Hook - useCallback() 🚀

# What is useCallback?

`useCallback` ek React Hook hai jo function ko memoize (cache) karta hai.

Simple Definition:

> **useCallback same function reference return karta hai jab tak dependencies change na ho.**

---

# Why useCallback?

Normal Function:

```jsx
function App(){

const hello = () => {
  console.log("Hello");
}

}
```

Har render par:

```text
New Function Object
```

create hota hai.

---

# Problem

```jsx
<Child fn={hello}/>
```

React compare karta hai:

```text
Old Function Reference

↓

New Function Reference

↓

Different

↓

Child Rerender
```

Even if function code same ho.

---

# Solution

```jsx
const hello = useCallback(() => {
  console.log("Hello");
}, []);
```

Ab React same function reference reuse karega.

---

# Syntax

```jsx
const memoizedFn = useCallback(() => {

}, []);
```

---

# Internal Working

Without useCallback:

```text
Render

↓

Create New Function

↓

New Reference

↓

Child Rerender
```

---

With useCallback:

```text
Render

↓

Dependency Check

↓

Same?

↓

Reuse Old Function

↓

No New Reference
```

---

# Example

```jsx
import {useState,useCallback} from "react";

function App(){

const [count,setCount]=useState(0);

const hello = useCallback(() => {
  console.log("Hello");
}, []);

return(
<>
<button
onClick={() => setCount(count+1)}
>
{count}
</button>

<Child fn={hello}/>
</>
)

}
```

---

# Dependency Array

```jsx
const hello = useCallback(() => {

console.log(count);

}, [count]);
```

Rule:

```text
Dependency Changed

↓

New Function

----------------

Dependency Same

↓

Reuse Old Function
```

---

# Real Use Case

Parent:

```jsx
const handleClick = useCallback(() => {

console.log("Clicked");

}, []);
```

Child:

```jsx
<Child handleClick={handleClick}/>
```

With:

```jsx
export default React.memo(Child);
```

Child unnecessary rerender nahi karega.

---

# useCallback vs Normal Function

Normal:

```jsx
const fn = () => {};
```

Every Render:

```text
New Function
```

---

useCallback:

```jsx
const fn = useCallback(() => {}, []);
```

Every Render:

```text
Same Function Reference
```

---

# useCallback vs useMemo

## useCallback

Returns:

```text
Function
```

```jsx
const fn = useCallback(() => {}, []);
```

---

## useMemo

Returns:

```text
Value
```

```jsx
const value = useMemo(() => {

return expensiveCalculation();

}, []);
```

---

# When to Use?

✅ Function passed as Props

✅ React.memo

✅ Expensive Child Components

✅ Prevent Unnecessary Rerenders

---

# When NOT to Use?

Bad:

```jsx
const hello = useCallback(() => {
console.log("Hi");
}, []);
```

if function is not passed to child and no optimization needed.

---

# Real Life Analogy

Without useCallback:

```text
Day1 -> ID 101

Day2 -> ID 102

Day3 -> ID 103
```

React:

```text
New Person
```

---

With useCallback:

```text
Day1 -> ID 101

Day2 -> ID 101

Day3 -> ID 101
```

React:

```text
Same Person
```

---

# Interview Definition

useCallback is a React Hook that memoizes a function and returns the same function reference between renders unless its dependencies change.

---

# Golden Rule 🚀

```text
Normal Function

↓

New Reference Every Render

----------------

useCallback

↓

Same Reference

----------------

Dependency Changed?

↓

New Function

----------------

Dependency Same?

↓

Reuse Old Function

----------------

Mostly Used With

↓

React.memo
```

# Easy Memory Trick

```text
useState

↓

Store State

----------------

useRef

↓

Store Mutable Value

----------------

useEffect

↓

Side Effects

----------------

useCallback

↓

Store Function Reference

----------------

useMemo

↓

Store Computed Value
```

# One-Line Summary

```text
useCallback function ko cache karta hai,
taaki har rerender par naya function object na bane aur unnecessary child rerenders avoid ho sake.
```