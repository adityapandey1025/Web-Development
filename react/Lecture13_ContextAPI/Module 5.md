# Context API Module 5 : Passing State & Functions 🚀

## Real Industry Pattern

Instead of:

```jsx
value="dark"
```

Developers usually pass an object.

---

## Provider

```jsx
const [theme,setTheme] = useState("dark");

<ThemeContext.Provider

value={{

theme,

setTheme

}}

>
```

---

## Child Component

```jsx
const {

theme,

setTheme

}

=

useContext(ThemeContext);
```

Read:

```jsx
theme
```

Update:

```jsx
setTheme("light");
```

---

## Why Object?

To share multiple values and functions.

Examples:

```jsx
value={{

theme,

setTheme

}}
```

```jsx
value={{

user,

setUser

}}
```

```jsx
value={{

cart,

addItem,

removeItem

}}
```

---

## Internal Flow

```text
useState()

↓

Provider

↓

value={{

state,

setState

}}

↓

useContext()

↓

Read State

↓

Update State
```

---

## Important

❌ Provider is not limited to strings.

✅ Can pass:

- State
    
- Functions
    
- Objects
    
- Arrays
    
- Booleans
    

---

## Industry Pattern

```jsx
value={{

state,

setState

}}
```

is the most common Context API pattern.

---

# Golden Rule 🔥

```text
State

↓

Provider

↓

value={{

state,

setState

}}

↓

useContext()

↓

Read

↓

Update
```

