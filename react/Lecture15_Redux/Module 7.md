# Redux Module 7: Provider 🍳

## Goal

Connect Redux Store to React App.

---

# Context API

```jsx
<TodoProvider value={{todos,setTodos}}>

<App/>

</TodoProvider>
```

---

# Redux

```jsx
<Provider store={store}>

<App/>

</Provider>
```

---

# Provider

Definition:

Makes Redux Store available to the entire React App.

Simple Hinglish:

```
Store ko sab components tak pahuchana.
```

---

# Import

```jsx
import { Provider } from "react-redux";
```

---

# Import Store

```jsx
import { store } from "./app/store";
```

---

# Industry Code

```jsx
<Provider store={store}>
    <App/>
</Provider>
```

---

# Location

✅ Industry:

```
main.jsx
```

Reason:

```
Provider

↓

Whole App

↓

All Components
```

---

# Context Mapping

|Context|Redux|
|---|---|
|TodoProvider|Provider|
|value={}|store={}|
|TodoContext|Store|

---

# Flow

```
Store

↓

Provider

↓

App

↓

Components

↓

dispatch()

↓

Store Updated

↓

UI Rerender
```

---

# Summary

```
Provider

↓

Receives Store

↓

Wraps App

↓

Makes Store Available

↓

Whole React App can use Redux
```

---

# One-line Trick 😂

Context:

```
<TodoProvider value={...}>
```

Redux:

```
<Provider store={store}>
```