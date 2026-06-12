# React Router Module 2: Link 🔗

## What is Link?

`Link` is used for **internal navigation without page reload**.

---

## Syntax

```jsx
import { Link } from "react-router-dom";

<Link to="/">Home</Link>

<Link to="/about">About</Link>
```

---

## How it Works?

```
Click Link
↓
URL Changes
↓
RouterProvider Detects
↓
Router Finds Route
↓
Component Renders
↓
No Reload
```

---

## Link vs a Tag

### Internal Navigation

```jsx
<Link to="/about">About</Link>
```

✅ Use Link

---

### External Website

```html
<a href="https://google.com">
Google
</a>
```

✅ Use a tag

---

## Important

❌ Link does NOT render components.

✅ Link only changes URL.

✅ RouterProvider renders the matching component.

---

## Golden Rule 🔥

```
Internal Route → Link

External Website → a Tag

Link
↓
Change URL
↓
RouterProvider
↓
Render Matching Component
↓
No Reload
```