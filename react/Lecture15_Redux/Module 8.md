# Redux Module 8: useDispatch() 🍳

## Goal

Learn how to update Redux Store from React Components.

---

# Recap

Need read data:

```jsx
useSelector()
```

Need update data:

```jsx
useDispatch()
```

---

# Context API

```jsx
const {setTodos}=useTodo();

setTodos(prev=>{

...

});
```

Need state update.

---

# Redux

Need state update.

```jsx
const dispatch=useDispatch();
```

---

# Import

```jsx
import { useDispatch } from "react-redux";
```

---

# dispatch

Definition:

dispatch() sends an Action to Redux Store.

Simple Hinglish:

```
Redux bhai,

ye action execute karo.
```

---

# Basic Syntax

```jsx
const dispatch=useDispatch();
```

Need Add Todo:

```jsx
dispatch(addTodo(todo));
```

Need Delete:

```jsx
dispatch(deleteTodo(id));
```

Need Toggle:

```jsx
dispatch(toggleTodo(id));
```

Need Edit:

```jsx
dispatch(editTodo(todo));
```

---

# Dry Run

Need Add Todo.

Component:

```jsx
dispatch(

addTodo({

id:Date.now(),

text:val,

completed:false

})

);
```

Redux Flow:

```
dispatch

↓

Action Created

↓

Reducer Called

↓

Store Updated

↓

React Detects Change

↓

UI Rerender
```

---

# Example Form.jsx

```jsx
import { useDispatch } from "react-redux";

import { addTodo } from "./todoSlice";

function Form(){

const dispatch=useDispatch();

function handleAdd(){

dispatch(

addTodo({

id:Date.now(),

text:"Learn Redux",

completed:false

})

);

}

}
```

---

# Example Delete

```jsx
const dispatch=useDispatch();

<button

onClick={()=>{

dispatch(deleteTodo(todo.id));

}}

>

Delete

</button>
```

---

# Context API Mapping

Context:

```jsx
const {setTodos}=useTodo();

setTodos(prev=>{

...

});
```

Redux:

```jsx
const dispatch=useDispatch();

dispatch(addTodo(todo));
```

---

# Visual

```
Component

↓

useDispatch()

↓

dispatch(action)

↓

Redux Store

↓

Reducer

↓

Store Updated

↓

React Rerender
```

---

# useSelector vs useDispatch

|Hook|Work|
|---|---|
|useSelector|Read Data|
|useDispatch|Update Data|

---

# Biggest Mapping

|Context API|Redux|
|---|---|
|useTodo()|useSelector()|
|setTodos()|useDispatch()|
|setTodos(prev=>...)|dispatch(action)|

---

# Complete Redux Flow

```
Provider

↓

Store

↓

useSelector()

↓

Read Data

----------------

useDispatch()

↓

dispatch()

↓

Reducer

↓

Store Updated

↓

UI Updated
```

---

# Golden Table

|Context|Redux|
|---|---|
|useTodo()|useSelector()|
|todos|state.todo|
|setTodos|useDispatch|
|setTodos(...)|dispatch(action)|

---

# One-line Trick 😂

## useSelector()

```
Store se data uthao.
```

---

## useDispatch()

```
Store ko update karvao.
```

---

# Full Mental Model

```
Context API

useTodo()

↓

todos

↓

setTodos()

---------------------

Redux

useSelector()

↓

state.todo

↓

useDispatch()

↓

dispatch(addTodo())
```

---

# Summary

```
Need Read

↓

useSelector()

----------------

Need Update

↓

useDispatch()

↓

dispatch(action)

↓

Reducer

↓

Store Updated

↓

React Rerender
```

---

# Mentor Check 😂

Question 1:

Need display todos.

Use:

A) useSelector()

B) useDispatch()

---

Question 2:

Need Add Todo.

Use:

A) useSelector()

B) useDispatch()

---

Question 3:

Need Delete Todo.

```jsx
dispatch( ? )
```

Hint:

```
deleteTodo(id)
```

---

# Ultimate Redux Cheat Sheet 🚀

```
Store
↓

Provider
↓

useSelector()  → Read

useDispatch()  → Update

dispatch()
↓

Action
↓

Payload
↓

Reducer
↓

Store Updated
↓

React Rerender
```
