# Redux Module 2: Slice 🍳

## Recap

Store contains:

```
User

Cart

Theme

Todos

Wishlist
```

Question:

Mix everything?

❌ No.

Need sections.

---

# Slice

Definition:

A Slice is a small part of the Redux Store responsible for one feature.

Simple Hinglish:

```
Store ka ek section.
```

---

# Store Structure

```
Store

↓

Todo Slice

↓

Cart Slice

↓

Theme Slice

↓

User Slice
```

---

# Todo Slice

Contains:

```
Todos Data

Add Todo

Delete Todo

Edit Todo

Toggle Todo
```

Everything related to todos.

---

# Cart Slice

Contains:

```
Cart Items

Add Item

Remove Item

Update Quantity
```

---

# Theme Slice

Contains:

```
Dark

Light
```

---

# User Slice

Contains:

```
Login

Logout

Profile
```

---

# Context Mapping

Context API:

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

---

# Real Life Analogy

Store:

```
Big House
```

Slices:

```
Rooms
```

```
House

↓

Todo Room

↓

Cart Room

↓

Theme Room

↓

User Room
```

---

# createSlice()

Redux Toolkit provides:

```
createSlice()
```

Its job:

```
Create one slice.
```

Example:

```
Todo Slice

↓

Todos

↓

Add

↓

Delete

↓

Edit

↓

Toggle
```

---

# Biggest Connection

Need Add Todo?

```
Todo Slice
```

Need Delete Todo?

```
Todo Slice
```

Need Dark Theme?

```
Theme Slice
```

Need Login?

```
User Slice
```

---

# Store + Slice

```
STORE

│

├── Todo Slice

│     ├── todos
│     ├── addTodo
│     ├── deleteTodo
│     ├── editTodo
│     └── toggleTodo

│

├── Cart Slice

│     ├── cartItems
│     └── addItem

│

├── Theme Slice

│     ├── dark
│     └── light

│

└── User Slice

      ├── login
      └── logout
```

---

# Today's Summary

```
Store

↓

Entire App Data

----------------

Slice

↓

One Feature

----------------

Todo Slice

↓

Todo Related Data

----------------

Cart Slice

↓

Cart Related Data
```

---

