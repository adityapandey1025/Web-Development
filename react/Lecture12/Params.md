# React Router Module 7: useParams 🚀

## What is useParams?

`useParams()` is a React Router hook used to **read dynamic values from the URL**.

---

## Dynamic Route

```jsx
{
path:"/user/:id",
element:<User/>
}
```

`:id` is a dynamic parameter.

---

## URL

```
/user/10
```

`useParams()` returns:

```js
{
id:"10"
}
```

---

## Syntax

```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();
```

---

## Example

Route:

```jsx
{
path:"/user/:id",
element:<User/>
}
```

Component:

```jsx
const { id } = useParams();

return <h1>User {id}</h1>;
```

URL:

```
/user/25
```

Output:

```
User 25
```

---

## Multiple Params

Route:

```jsx
/product/:category/:id
```

URL:

```
/product/mobile/101
```

Result:

```js
{
category:"mobile",
id:"101"
}
```

---

## Internal Flow

```text
URL
↓
RouterProvider
↓
Router
↓
Extract Params
↓
useParams()
↓
Component
```

---

## useNavigate vs useParams

|useNavigate|useParams|
|---|---|
|Change URL|Read URL|
|Navigate|Get Dynamic Values|

---

## Important

❌ useParams() does NOT navigate.

❌ useParams() does NOT change URL.

✅ It reads dynamic route parameters.

---

# Golden Rule 🔥

```text
Need Dynamic URL?

↓

:path

↓

useParams()

↓

Read Dynamic Value

↓

Render Component
```