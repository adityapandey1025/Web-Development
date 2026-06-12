# React Router Module 3: Layout & Outlet 🏗️

## Problem

Header/Footer har page par chahiye.

❌ Bad:

```
Home → Header + Home

About → Header + About

Contact → Header + Contact
```

Code repeat hoga.

---

## Solution

Use **Layout**.

```text
Header

------

Outlet

------

Footer
```

---

## Outlet

`Outlet` ek placeholder hai jahan current child route render hota hai.

```jsx
<Header/>

<Outlet/>

<Footer/>
```

---

## Dry Run

URL:

```
/
```

```
Header

Home

Footer
```

---

URL:

```
/about
```

```
Header

About

Footer
```

---

URL:

```
/contact
```

```
Header

Contact

Footer
```

---

## children

```jsx
{
element:<Layout/>,

children:[
Home,
About,
Contact
]
}
```

Matlab:

```
Layout

|

|-- Home

|-- About

|-- Contact
```

---

## Internal Flow

```
URL

↓

RouterProvider

↓

Layout

↓

Header

↓

Outlet

↓

Current Child Route

↓

Footer
```

---

## Important

❌ Outlet route create nahi karta.

✅ Outlet current child component render karta hai.

---

# Golden Rule 🔥

```
Layout

↓

Common UI

(Header/Footer/Navbar)

------------

Outlet

↓

Current Child Route

------------

No Code Repetition
```