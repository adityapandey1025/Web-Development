# React Hooks Notes 🚀

A beginner-friendly guide to understanding **React Hooks**, especially **useState** and **useEffect**, with internal working, examples, and interview-oriented notes.

---

# 📚 Table of Contents

- Introduction to Hooks
    
- useState()
    
    - What is useState?
        
    - Why useState?
        
    - Syntax
        
    - Internal Working
        
    - setState()
        
    - Functional Updates
        
    - Common Use Cases
        
    - Rules
        
- useEffect()
    
    - What is useEffect?
        
    - Side Effects
        
    - Why useEffect?
        
    - Dependency Array
        
    - Cleanup Function
        
    - Dependency Comparison
        
    - Rules
        
- useState vs useEffect
    
- Internal Flow
    
- Interview Definitions
    
- Quick Revision Notes
    

---

# 🚀 Introduction to Hooks

Hooks are special built-in React functions that allow Functional Components to use React features such as:

- State
    
- Effects
    
- Context
    
- Refs
    

Before React 16.8, these features were primarily available in Class Components.

---

# 1️⃣ useState()

## What is useState?

`useState` is a React Hook that allows Functional Components to store and update state values while preserving them across rerenders.

---

## Why useState?

Consider:

```jsx
let count = 0;
```

### Problem

Normal JavaScript variables are not tracked by React.

```text
count changes
↓
React doesn't know
↓
No rerender
↓
UI doesn't update
```

Even if the component rerenders later, the variable may be recreated from its initial value.

---

## Solution

```jsx
const [count, setCount] = useState(0);
```

React stores the value in its internal state storage and preserves it between renders.

---

## Syntax

```jsx
const [state, setState] = useState(initialValue);
```

Example:

```jsx
const [count, setCount] = useState(0);
```

---

## Internal Working

Initial State:

```text
React State Storage

[0]
```

Update:

```jsx
setCount(1);
```

Updated State:

```text
React State Storage

[1]
```

React schedules a rerender and updates the UI.

---

## setState()

❌ Wrong

```jsx
count++;
```

This changes a variable but does not notify React.

✅ Correct

```jsx
setCount(count + 1);
```

This updates state and tells React to rerender.

---

## Functional Updates

### Problem

```jsx
setCount(count + 1);
setCount(count + 1);
```

Suppose:

```jsx
count = 0;
```

Both calls use the same value:

```jsx
setCount(1);
setCount(1);
```

Final value:

```text
1
```

---

### Correct Way

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Result:

```text
2
```

Each update receives the latest state value.

---

## Common Use Cases

✅ Counter

✅ Toggle Button

✅ Form Inputs

✅ Login State

✅ Dark Mode

✅ Shopping Cart

---

## Rules of useState

✅ Call at top level

✅ Call inside Functional Components

✅ Call inside Custom Hooks

❌ Do not call inside loops

❌ Do not call inside conditions

❌ Do not call inside nested functions

---

## Easy Memory

```text
useState

↓

Store State

↓

Update State

↓

Rerender UI
```

---

# 2️⃣ useEffect()

## What is useEffect?

`useEffect` is a React Hook that allows Functional Components to perform side effects after rendering.

---

## What are Side Effects?

Operations that are outside the rendering process.

Examples:

✅ API Calls

✅ Timers

✅ Event Listeners

✅ Local Storage

✅ Database Operations

✅ Subscriptions

---

## Why useEffect?

Without useEffect:

```jsx
fetch("/api/data");
```

Every rerender would execute:

```text
Render
↓
API Call
↓
Render
↓
API Call
↓
Render
↓
API Call
```

This can create unnecessary requests.

---

## Syntax

```jsx
useEffect(() => {
  // code
}, dependencies);
```

---

# Case 1: No Dependency Array

```jsx
useEffect(() => {
  console.log("Hi");
});
```

Runs after every render.

---

# Case 2: Empty Dependency Array

```jsx
useEffect(() => {
  console.log("Hi");
}, []);
```

Runs once after initial mount.

### Note

In React Strict Mode (development only), the effect may run twice for debugging purposes.

Production builds run it once.

---

# Case 3: Dependency Array

```jsx
useEffect(() => {
  console.log("Count Changed");
}, [count]);
```

Runs whenever `count` changes.

---

## Constant Dependency

```jsx
useEffect(() => {
  console.log("Hi");
}, [4]);
```

Technically runs once because the dependency never changes.

However, in real applications, use:

```jsx
[]
```

instead.

---

## Multiple Dependencies

```jsx
useEffect(() => {
  console.log("Changed");
}, [count, name]);
```

Runs when:

- count changes
    
- name changes
    

---

# Dependency Comparison

React compares dependencies using:

```jsx
Object.is(oldValue, newValue)
```

---

## Primitive Values

```jsx
10 === 10
```

```text
true
```

```jsx
"A" === "A"
```

```text
true
```

No rerun.

---

## Objects

```jsx
const obj = {};
```

Each render creates a new object.

```text
{} === {}
false
```

Effect reruns.

---

## Arrays

```text
[] === []
false
```

New reference every render.

Effect reruns.

---

## Functions

```text
(() => {}) === (() => {})
false
```

New reference every render.

Effect reruns.

---

# Cleanup Function

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Hi");
  }, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

Cleanup runs:

- Before effect reruns
    
- When component unmounts
    

---

## Cleanup Use Cases

✅ Timers

✅ Event Listeners

✅ WebSocket Connections

✅ Subscriptions

---

## Rules of useEffect

✅ Top level only

✅ Functional Components

✅ Custom Hooks

❌ Loops

❌ Conditions

❌ Nested Functions

---

# ⚔️ useState vs useEffect

|useState|useEffect|
|---|---|
|Stores State|Performs Side Effects|
|Triggers UI Updates|Runs After Render|
|Preserves Data|Handles External Operations|
|React State Memory|API, Timer, Events|

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
Component Render

↓

useState

↓

Store State

↓

setState()

↓

React Rerender

↓

UI Updated

----------------

Render Finished

↓

useEffect()

↓

API Calls

Timers

Events

↓

Cleanup
```

---

# 🎯 Interview Definitions

## useState

useState is a React Hook that allows Functional Components to store and update state values while preserving them across rerenders.

---

## useEffect

useEffect is a React Hook that allows Functional Components to perform side effects after rendering.

---

# 🚀 Quick Revision

```text
Normal Variable

↓

React Doesn't Track It

↓

No Rerender

↓

UI Doesn't Update

----------------

useState

↓

React State Memory

↓

State Change

↓

Rerender

↓

UI Update

----------------

Need API?

Need Timer?

Need Event Listener?

↓

useEffect

----------------

No Dependency Array

↓

Every Render

----------------

[]

↓

Initial Mount Only

----------------

[count]

↓

When Count Changes

----------------

Primitive Values

↓

Compared by Value

----------------

Objects / Arrays / Functions

↓

Compared by Reference
```

---

# 🧠 Easy Memory Trick

```text
useState

→ Save State

----------------

useEffect

→ Do Something

----------------

[]

→ Run Once

----------------

[count]

→ Run When Count Changes

----------------

No Dependency Array

→ Run After Every Render
```