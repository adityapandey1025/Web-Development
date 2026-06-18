# Redux Module 3: Installation + First Store 🍳

## Goal

Today we will:

- Install Redux Toolkit
    
- Install React Redux
    
- Create our first Redux Store
    
- Understand every line of code
    

---

# Step 1: Installation

Run:

```bash
npm install @reduxjs/toolkit react-redux
```

## Why two packages?

### @reduxjs/toolkit

Provides:

- configureStore()
    
- createSlice()
    
- Modern Redux features
    

Simple:

```
Redux Logic
```

---

### react-redux

Provides:

- Provider
    
- useSelector()
    
- useDispatch()
    

Simple:

```
React ↔ Redux Connection
```

---

# Step 2: Folder Structure

Industry standard:

```
src

│

├── app
│   └── store.js

│

└── features
    └── todo
        └── todoSlice.js
```

## app

Contains:

```
Redux Store
```

## features

Contains:

```
Slices
```

---

# Step 3: Create Store

Create:

```
src/app/store.js
```

Code:

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {}
});
```

---

# Line 1

```js
import { configureStore } from "@reduxjs/toolkit";
```

## What?

Importing configureStore.

## Why?

Redux Toolkit provides this helper to create a Redux Store.

Simple:

```
configureStore()

↓

Modern Redux Store Creator
```

---

# Line 2

```js
export const store =
```

## What?

Creating a store variable.

## Why export?

Need to use it inside Provider later.

```
Provider

↓

App

↓

Components
```

Need access.

---

# Line 3

```js
configureStore({
```

## What?

Calling configureStore().

## Why?

To create the Redux Store.

---

# reducer

```js
reducer: {}
```

## What?

A place where slices will be connected.

## Current State

Store is empty.

```
STORE

↓

Empty
```

---

# Future

Later:

```js
configureStore({
    reducer: {
        todo: todoSlice,
        theme: themeSlice
    }
});
```

Meaning:

```
STORE

↓

Todo Slice

↓

Theme Slice
```

---

# Why Empty?

Because we haven't created any slices yet.

```
Todo Slice ❌

Theme Slice ❌

Cart Slice ❌
```

So:

```js
reducer: {}
```

---

# Context API Connection

Context:

```
TodoContext

↓

todos

setTodos
```

Redux:

```
Store

↓

Todo Slice

↓

todos
```

Store contains slices.

---

# Visual Diagram

Current:

```
STORE

|

|-- Empty
```

Future:

```
STORE

|

|-- Todo Slice

|

|-- Theme Slice

|

|-- Cart Slice
```

---

# Flow

```
Redux Toolkit

↓

configureStore()

↓

Redux Store Created

↓

Need Slices

↓

Slices connect inside reducer:{}

↓

Store Ready
```

---

# Summary

```
Install Packages

↓

Create app/store.js

↓

Import configureStore()

↓

Create Store

↓

reducer:{} is waiting for slices

↓

Slices will be added later
```

---

# Important Points

✅ configureStore() creates a Redux Store.

✅ Store contains application-wide shared state.

✅ reducer:{} is where slices connect.

✅ Empty reducer means no slices yet.

✅ Store ≠ TodoContext.

✅ Store contains multiple slices.

---

