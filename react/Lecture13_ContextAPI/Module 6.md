# Context API Module 6 : Industry Pattern (Provider Alias + Custom Hook) 🚀

## createContext with Default Value

Instead of:

```jsx
const ThemeContext = createContext();
```

Industry often uses:

```jsx
const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
});
```

Default values are returned if no Provider is available.

---

## Provider Alias

Instead of writing:

```jsx
<ThemeContext.Provider>
```

Create an alias:

```jsx
export const ThemeProvider = ThemeContext.Provider;
```

Now use:

```jsx
<ThemeProvider value={...}>

    {children}

</ThemeProvider>
```

Cleaner syntax.

---

## Custom Hook

Instead of:

```jsx
import { useContext } from "react";

const theme = useContext(ThemeContext);
```

Create a custom hook:

```jsx
export default function useTheme() {
    return useContext(ThemeContext);
}
```

Now simply write:

```jsx
const theme = useTheme();
```

---

## Why Custom Hook?

Avoid repeating:

```jsx
import ThemeContext

import useContext

useContext(ThemeContext)
```

One function handles everything.

---

## Default Value

```jsx
createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
})
```

Provides a fallback value when Provider is missing.

---

## Internal Flow

```text
createContext(defaultValue)

↓

Context Object

↓

Provider Alias

↓

Provide Value

↓

Custom Hook

↓

useContext()

↓

Access Value
```

---

## Difference from Basic Context API

### Basic

```text
createContext()

↓

Provider

↓

useContext()
```

---

### Industry Pattern

```text
createContext(defaultValue)

↓

Provider Alias

↓

Custom Hook

↓

useContext()
```

---

## Important

❌ Custom Hook does not create Context.

❌ Provider Alias does not create a new Provider.

✅ Provider Alias is simply:

```jsx
ThemeContext.Provider
```

✅ Custom Hook internally calls:

```jsx
useContext(ThemeContext)
```

---

## Interview Question

### Why create a custom hook for Context?

To avoid repeated Context imports and `useContext(Context)` calls, making code cleaner and easier to maintain.

---

# Golden Rule 🔥

```text
createContext(defaultValue)

↓

Provider Alias

↓

Provide Value

↓

Custom Hook

↓

useContext()

↓

Read Shared Data
```