# React Hooks Notes (useState + useEffect) 🚀

# 1. useState()

## What is useState?

`useState` ek React Hook hai jo Functional Component me state (data) ko store aur update karne ke liye use hota hai.

---

## Why useState?

Normal variable:

```jsx
let count=0;
```

Problem:

```text
Render

↓

count=0

↓

Click

↓

Render

↓

count=0
```

Value reset ho jati hai.

Solution:

```jsx
const [count,setCount]=useState(0);
```

React value ko apni memory me store karta hai.

---

## Syntax

```jsx
const [state,setState]=useState(initialValue);
```

Example:

```jsx
const [count,setCount]=useState(0);
```

---

## Internal Working

Initial:

```text
Memory

[0]
```

Click:

```jsx
setCount(1);
```

Memory:

```text
[1]
```

React rerender karta hai.

---

## setState()

Wrong:

```jsx
count++;
```

Correct:

```jsx
setCount(count+1);
```

---

## Functional Update

Wrong:

```jsx
setCount(count+1);
setCount(count+1);
```

May update by +1.

Correct:

```jsx
setCount(prev=>prev+1);
setCount(prev=>prev+1);
```

Updates by +2.

---

## Common Uses

✅ Counter

✅ Toggle

✅ Input Field

✅ Login State

✅ Dark Mode

---

## Rules

✅ Top level.

✅ Functional Component.

❌ if

❌ for

❌ while

---

# Easy Memory

```text
useState

↓

Store Data

↓

Update State

↓

Rerender UI
```

---

# 2. useEffect()

## What is useEffect?

useEffect ek React Hook hai jo Side Effects perform karne ke liye use hota hai.

---

## Side Effects

Jo UI rendering ka part nahi hain.

Examples:

✅ API Call

✅ Timer

✅ Event Listener

✅ Local Storage

✅ Database

---

## Why useEffect?

Example:

```jsx
fetch(...)
```

Without useEffect:

```text
Render

↓

API

↓

Render

↓

API

↓

Render

↓

API
```

Multiple calls.

---

## Syntax

```jsx
useEffect(()=>{

code

},dependency)
```

---

# Case 1

No Dependency

```jsx
useEffect(()=>{

console.log("Hi");

});
```

Runs after EVERY render.

---

# Case 2 ⭐

Empty Array

```jsx
useEffect(()=>{

console.log("Hi");

},[]);
```

Runs only ONCE.

---

# Case 3 ⭐⭐⭐⭐⭐

Dependency

```jsx
useEffect(()=>{

console.log("Hi");

},[count]);
```

Runs whenever count changes.

---

## Constant Dependency

```jsx
useEffect(()=>{

console.log("Hi");

},[4]);
```

Runs only once.

Because:

```text
4

↓

4

↓

No Change
```

---

## Multiple Dependencies

```jsx
useEffect(()=>{

console.log("Hi");

},[count,name]);
```

Runs when:

✅ count changes

OR

✅ name changes

---

# Dependency Comparison

React internally checks:

```text
Old Dependency

↓

New Dependency

↓

===

↓

Changed?

↓

Run Effect
```

---

# Primitive Values

```text
10===10

true

"A"==="A"

true
```

No rerun.

---

# Objects

```jsx
const obj={};
```

Every render:

```text
{}==={}

false
```

Effect reruns.

---

# Arrays

```text
[]===[]

false
```

New reference.

---

# Functions

```text
(()=>{})===(()=>{})

false
```

New reference.

---

# Cleanup Function

```jsx
useEffect(()=>{

const id=setInterval(()=>{

console.log("Hi");

},1000);

return ()=>{

clearInterval(id);

}

},[]);
```

Used for:

✅ Timer

✅ Event Listener

✅ Subscription

---

# Rules

Same as Hooks.

✅ Top level.

❌ Loop.

❌ Condition.

---

# useState vs useEffect

|useState|useEffect|
|---|---|
|Store Data|Perform Side Effects|
|Updates UI|Runs after Render|
|React Memory|API, Timer, Events|

---

# Most Important Difference

```text
Need to SAVE data?

↓

useState

----------------

Need to DO something after render?

↓

useEffect
```

---

# Internal Flow

```text
Component

↓

useState

↓

Store Data

↓

setState()

↓

Rerender

↓

UI Updated

----------------

Render Complete

↓

useEffect()

↓

API

Timer

Events

↓

Cleanup
```

---

# Interview Definitions

## useState

useState is a React Hook that allows Functional Components to store and update state values while preserving them across rerenders.

---

## useEffect

useEffect is a React Hook that allows Functional Components to perform side effects after rendering.

---

# Golden Rules 🚀

```text
Normal Variable

↓

Value Lost

↓

useState

↓

React Memory

----------------

Need API?

Need Timer?

Need Event?

↓

useEffect

----------------

No Dependency

↓

Every Render

----------------

[]

↓

Once

----------------

[count]

↓

When Count Changes

----------------

Primitive

↓

Compared by Value

----------------

Object/Array/Function

↓

Compared by Reference
```

# Easy Memory Trick

```text
useState

→ Save Data

----------------

useEffect

→ Do Something

----------------

[]

→ Once

----------------

[count]

→ Count Change

----------------

No Array

→ Every Render
```