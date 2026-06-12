# React Router Module 8: Loader 🚀

## What is Loader?

Loader is a function that **fetches data before rendering a route component**.

---

## Route

```jsx
{
path:"/github",
element:<Github/>,
loader:githubLoader
}
```

---

## Loader Function

```jsx
export const githubLoader = async () => {
    const response = await fetch(API);
    return response.json();
}
```

---

## Access Loader Data

```jsx
import { useLoaderData } from "react-router-dom";

const data = useLoaderData();
```

---

## Internal Flow

```text
URL
↓
RouterProvider
↓
Route
↓
Loader
↓
Fetch Data
↓
Component
↓
useLoaderData()
↓
Render
```

---

## Loader vs useEffect

|useEffect|Loader|
|---|---|
|After Render|Before Render|
|Component Fetches|Router Fetches|
|Loading State|Data Ready|

---

## Important

❌ Loader does NOT render components.

✅ Loader fetches data.

✅ RouterProvider renders the component.

✅ useLoaderData() reads loader data.

---

## Common Use Cases

✅ GitHub Profile

✅ User Profile

✅ Product Details

✅ Dashboard Data

✅ API Data Before Render

---
