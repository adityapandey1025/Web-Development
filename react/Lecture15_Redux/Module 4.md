# Redux Module 4: createSlice() 🍳

## Goal

Today we will learn:

- What is createSlice()?
    
- Why do we need it?
    
- How does it relate to Context API?
    
- First Todo Slice.
    

---

# Recap

We created:

```js
export const store = configureStore({
    reducer:{}
})
```

Question:

Why empty?

Because:

```text
Todo Slice ❌

Theme Slice ❌

Cart Slice ❌
```

Not created yet.

---

# Problem

Suppose Todo App.

Need:

```text
Todos

Add Todo

Delete Todo

Edit Todo

Toggle Todo
```

Question:

Where should all Todo logic live?

Context API:

```text
TodoContext
```

Redux:

```text
Todo Slice
```

---

# Slice

Definition:

A Slice is a small part of the Redux Store that manages one feature.

Simple:

```text
Todo Feature

↓

Todo Slice
```

---

# Folder

Industry:

```
src

|

|--features

    |

    |--todo

        |

        |--todoSlice.js
```

---

# Code

```js
import { createSlice } from "@reduxjs/toolkit";
```

---

# Line 1

```js
import { createSlice } from "@reduxjs/toolkit";
```

## What?

Import createSlice.

## Why?

Need to create one Slice.

Simple:

```text
createSlice()

↓

Slice Builder
```

---

# Create Slice

```js
export const todoSlice = createSlice({

})
```

---

# Question

What is createSlice() doing?

Simple:

Need:

```text
Todo Section
```

createSlice builds it.

---

# Real Life 😂

Store:

```text
Big House
```

Need:

```text
Todo Room
```

createSlice:

```text
House Builder

↓

Creates Todo Room
```

---

# Slice Needs

Need tell Redux:

Question:

What is Slice name?

Question:

Initial data?

Question:

What operations?

---

# Name

```js
name:"todo"
```

Meaning:

This Slice is responsible for:

```text
Todos
```

---

# Initial State

Question:

Initially Todo App has?

```text
[]
```

Need:

```js
initialState:[]
```

Simple.

Equivalent:

Context:

```js
const [todos,setTodos]=useState([]);
```

Redux:

```js
initialState:[]
```

---

# reducers

Need:

```text
Add

Delete

Edit

Toggle
```

Place:

```js
reducers:{}
```

Current:

```js
createSlice({

name:"todo",

initialState:[],

reducers:{}

})
```

---

# reducers

Question:

What is reducers?

Simple:

```text
Todo Operations
```

Need:

```text
Add Todo

Delete Todo

Edit Todo

Toggle Todo
```

All here.

---

# Context Mapping

Context:

```js
setTodos(...)
```

Redux:

```text
reducers

↓

Update State
```

---

# Visual

Current:

```
Todo Slice

|

|-- Name

|

|-- Initial State

|

|-- Reducers
```

---

# Full Code

```js
import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({

    name:"todo",

    initialState:[],

    reducers:{}

})
```

---

# Dry Run

Question:

Todo Slice created?

✅ Yes

Question:

Todo data?

✅ Empty Array

Question:

Operations?

❌ Not yet.

Need later.

---

# Compare with Context API

Context:

```js
const [todos,setTodos]=useState([]);
```

Redux:

```js
name:"todo"

initialState:[]

reducers:{}
```

---

# Biggest Connection 🔥

Context:

```
TodoContext

↓

todos

↓

setTodos()
```

Redux:

```
Todo Slice

↓

initialState

↓

reducers
```

---

# Store Connection

Current:

Store:

```js
configureStore({

reducer:{}

})
```

Todo Slice:

```js
todoSlice
```

Future:

```js
configureStore({

reducer:{

todo:todoSlice.reducer

}

})
```

Don't memorize.

Just know:

```text
Store

↓

Needs Slice

↓

Slice Created
```

---

# Summary

```
createSlice()

↓

Creates One Slice

------------

name

↓

Feature Name

------------

initialState

↓

Starting Data

------------

reducers

↓

Operations

------------

Todo Slice Ready
```

---

# Mentor Homework 😂

Context:

```js
const [todos,setTodos]=useState([]);
```

Redux:

```js
name:"todo"

initialState:[]

reducers:{}
```

Question:

Which part is closest to:

```js
setTodos()
```

A)

name

B)

initialState

C)

reducers

Hint:

```text
State Update Logic
```