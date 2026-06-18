# Redux Module 1: Store 🍳

## Problem

### useState

```jsx
const [count, setCount] = useState(0);
```

Good for one component.

---

## Shared State

Suppose:

```
App

↓

Form

↓

Item
```

Need:

```
todos

setTodos
```

Multiple components need same data.

---

## Context API

We solved it using:

```
App

↓

TodoProvider

↓

Form

Item
```

Shared state.

---

## Bigger App

Suppose Amazon.

Need:

```
Cart

Theme

User

Wishlist

Notifications
```

Creating:

```
CartContext

ThemeContext

UserContext

WishlistContext

...
```

Many providers.

---

# Redux Solution

Redux says:

```
Put all shared data in one place.
```

That place is called:

# STORE

---

# Definition

Store = Central place for storing shared application data.

Simple Hinglish:

```
Application ka common data center.
```

---

# Example

```
Store

↓

Cart

↓

Theme

↓

User

↓

Wishlist

↓

Todos
```

---

# Context vs Redux

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

todos

cart

theme

user
```

---

# Store != TodoContext

❌ Wrong:

```
Store = TodoContext
```

✅ Correct:

```
Store ≈ All Contexts Together
```

Example:

```
TodoContext

CartContext

ThemeContext

UserContext

↓

Redux Store
```

---

# Real Life Analogy

Context:

Different drawers.

```
Wallet Drawer

Phone Drawer

Keys Drawer
```

Redux:

One big common drawer.

```
STORE
```

Need anything?

Open the drawer.

---

# Store Contains

Example:

```js
{

todos:[],

cart:[],

theme:"dark",

user:{}

}
```

Simple.

---

# Today's Summary

```
useState

↓

One Component

----------------

Context

↓

Few Components

----------------

Redux

↓

Whole Application

----------------

Store

↓

Common Shared Data
```

---

# Homework

Suppose Instagram.

Need:

```
User

Posts

Theme

Messages

Notifications
```

Question:

Would you create many contexts or one Redux Store?