# Context API Module 3 : Provider 🚀

## What is Provider?

Provider is used to provide shared data to child components.

---

## Syntax

```jsx
<UserContext.Provider value="Nikhil">

    {children}

</UserContext.Provider>
```

---

## value

The `value` prop contains the shared data.

Examples:

```jsx
value="Nikhil"

value="dark"

value={10}

value={true}

value={{name:"Nikhil"}}
```

---

## children

```jsx
<UserContextProvider>

<Home/>

</UserContextProvider>
```

`children` refers to everything inside the Provider.

---

## Industry Pattern

Usually:

```text
UserContext.js

↓

UserContextProvider.jsx

↓

App.jsx
```

Provider is generally placed inside a separate Provider component.

---

## Internal Flow

```text
createContext()

↓

Provider

↓

Provide Value

↓

Children
```

---

## Important

❌ Provider does not create Context.

❌ Provider does not read Context.

✅ Provider provides shared data.

---

# Golden Rule 🔥

```text
createContext()

↓

Provider

↓

Provide Value

↓

Children
```