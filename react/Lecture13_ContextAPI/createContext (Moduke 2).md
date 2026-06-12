# Context API Module 2: createContext() 🚀

## What is createContext()?

`createContext()` is a React function that creates a **Context Object**.

```jsx
import { createContext } from "react";

const UserContext = createContext();
```

---

## Does createContext() store data?

❌ No.

It only creates a Context Object.

Data is provided later using Provider.

---

## Why do we need createContext()?

React may have multiple shared states:

- User
    
- Theme
    
- Cart
    
- Authentication
    

Each shared state needs its own Context Object.

```jsx
const UserContext = createContext();

const ThemeContext = createContext();
```

---

## Industry Structure

```
src

|

context

|

UserContext.js

UserContextProvider.jsx
```

### UserContext.js

```jsx
import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
```

---

# Context API 3-Step Flow 🔥

## Step 1 : Create Context

```jsx
const UserContext = createContext();
```

Creates a Context Object.

---

## Step 2 : Provide Value

```jsx
<UserContext.Provider value="Nikhil">

    {children}

</UserContext.Provider>
```

Stores the shared value.

Usually wrapped inside:

```jsx
UserContextProvider.jsx
```

---

## Step 3 : Read Value

```jsx
const user = useContext(UserContext);
```

Returns:

```jsx
"Nikhil"
```

---

## Internal Flow

```text
createContext()

↓

Create Context Object

↓

Provider

↓

Provide Value

↓

useContext()

↓

Read Value
```

---

## Important

❌ createContext() does not store data.

❌ createContext() does not read data.

✅ createContext() creates a Context Object.

---

## Interview Question

### What does createContext() return?

A Context Object.

---

# Golden Rule 🔥

```text
Step 1

createContext()

↓

Step 2

Provider

↓

Provide Value

↓

Step 3

useContext()

↓

Access Shared Value
```