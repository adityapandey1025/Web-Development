# Context API Module 4 : useContext() 🚀

## What is useContext()?

`useContext()` is a React hook used to read values from a Context.

---

## Syntax

```jsx
import { useContext } from "react";

const user = useContext(UserContext);
```

---

## Example

Provider:

```jsx
<UserContext.Provider value="Nikhil">

<Home/>

</UserContext.Provider>
```

Child:

```jsx
const user = useContext(UserContext);
```

Output:

```text
Nikhil
```

---

## Why pass UserContext?

React may have multiple contexts.

```jsx
useContext(UserContext);

useContext(ThemeContext);

useContext(AuthContext);
```

Each reads its own Context value.

---

## Internal Flow

```text
createContext()

↓

Provider

↓

Provide Value

↓

useContext(Context)

↓

Read Value
```

---

## Important

❌ useContext does not create Context.

❌ useContext does not provide data.

✅ useContext reads shared data.

---

# Golden Rule 🔥

```text
createContext()

↓

Provider

↓

Provide Value

↓

useContext()

↓

Access Value
```