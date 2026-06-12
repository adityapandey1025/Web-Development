# React Router Module 4: NavLink 🎯

## What is NavLink?

NavLink = Link + Active Route Detection.

---

## Why NavLink?

Normal Link active page nahi batata.

Current URL:

```
/about
```

Need:

```
Home  ABOUT  Contact
```

---

## Syntax

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/about">
About
</NavLink>
```

---

## isActive

NavLink automatically provides:

```jsx
isActive
```

Current URL:

```
/about
```

About:

```
isActive=true
```

Home:

```
isActive=false
```

---

## Styling

```jsx
className={({isActive})=>

isActive

?

"active"

:

""

}
```

---

## Link vs NavLink

|Link|NavLink|
|---|---|
|Navigation|Navigation|
|No Reload|No Reload|
|No Active State|Active State|

---
# React Router Module 6: useNavigate 🚀

## What is useNavigate?

`useNavigate()` is a React Router hook used for **programmatic navigation**.

---

## Syntax

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
```

Navigate:

```jsx
navigate("/about");
```

---

## How it Works?

```
navigate("/about")

↓

URL Changes

↓

RouterProvider Detects

↓

Router Matches Route

↓

Component Renders
```

---

## Link vs useNavigate

|Link|useNavigate|
|---|---|
|User Click|Code Driven|
|Manual Navigation|Automatic Navigation|

---

## Common Uses

✅ Login Success

✅ Logout

✅ Form Submit

✅ Payment Success

✅ Redirect after API

---

## Back & Forward

Go Back:

```jsx
navigate(-1);
```

Go Forward:

```jsx
navigate(1);
```

---

## Replace History

```jsx
navigate("/home",{
    replace:true
});
```

Prevents going back to previous page.

---

## Important

❌ useNavigate does NOT render components.

✅ It only changes URL.

✅ RouterProvider renders the matching component.

---
