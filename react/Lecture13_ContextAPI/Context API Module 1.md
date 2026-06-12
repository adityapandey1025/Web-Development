#  Why Context API? 🚀



## What is Prop Drilling?

Prop drilling means passing props through intermediate components that do not need them.

Example:

```text
App

↓

Navbar

↓

Profile

↓

Avatar
```

Only `Avatar` needs `username`, but every component passes it.

---

## Why is Prop Drilling Bad?

- Unnecessary prop passing.
    
- Code becomes hard to maintain.
    
- Deep component trees become messy.
    
- Intermediate components don't use the data.
    

---

## What is Context API?

Context API is a React feature that allows sharing common data across multiple components without manually passing props.

---

## How Context Solves the Problem?

Instead of:

```text
App

↓

Navbar

↓

Profile

↓

Avatar
```

React creates a common data store.

Any child component can access the shared data directly.

---

## Common Use Cases

### Authentication

```text
User
Login
Logout
Token
```

### Theme

```text
Dark
Light
```

### Language

```text
English
Hindi
```

### Shopping Cart

```text
Items
Count
Total Price
```

### User Profile

```text
Name
Email
Avatar
```

---

## Props vs Context

|Props|Context|
|---|---|
|Parent to Child|Shared Data|
|Small Scope|Global/Common Scope|
|Simple Data|Frequently Used Data|

---

## Important

❌ Context does NOT replace props.

❌ Every state should NOT go into Context.

✅ Use props for local component communication.

✅ Use Context for common shared data.

---

## Interview Questions

### What is Prop Drilling?

Passing props through components that do not require them.

---

### What is Context API?

A React feature for sharing data across the component tree without manually passing props at every level.

---

# Golden Rule 🔥

```text
Need Data For Few Components?

↓

Props

----------------

Need Common Shared Data?

↓

Context API

↓

Avoid Prop Drilling

↓

Access Data Anywhere
```