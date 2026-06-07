# React Lecture 3 Notes (Hinglish)

## 🎯 Goal of Lecture

Is lecture ka main goal tha:

- React ko andar se samajhna
    
- Custom React Library banana
    
- JSX ka actual working mechanism samajhna
    
- React Element aur Rendering process ko understand karna
    

---

# React Render Kaise Kaam Karta Hai?

React directly HTML ko browser me nahi daalta.

Pehle React ek object structure banata hai, fir us object ko DOM me render karta hai.

Example:

```js
const reactElement = {
  type: "a",
  props: {
    href: "https://google.com"
  },
  children: "Click Me"
}
```

Yeh object represent karta hai:

```html
<a href="https://google.com">Click Me</a>
```

---

# React Element Anatomy

Har React Element ke 3 important parts hote hain:

### 1. type

Batata hai kaunsa HTML tag create karna hai.

```js
type: "h1"
```

---

### 2. props

Tag ke attributes.

```js
props: {
  href: "https://google.com",
  target: "_blank"
}
```

---

### 3. children

Tag ke andar ka content.

```js
children: "Hello World"
```

---

# Custom Render Function

Basic Steps:

### Step 1

DOM element create karo.

```js
const domElement =
document.createElement(reactElement.type);
```

---

### Step 2

Children set karo.

```js
domElement.innerHTML =
reactElement.children;
```

---

### Step 3

Props loop karo.

```js
for(const prop in reactElement.props){
  domElement.setAttribute(
    prop,
    reactElement.props[prop]
  );
}
```

---

### Step 4

Container me append karo.

```js
container.appendChild(domElement);
```

---

# Important Concept

### Why use:

```js
reactElement.props[prop]
```

and not

```js
reactElement.props.prop
```

Because:

```js
prop
```

ek variable hai.

Example:

```js
prop = "href"
```

Toh:

```js
reactElement.props[prop]
```

ban jayega:

```js
reactElement.props["href"]
```

which is valid.

---

# JSX Kya Hai?

JSX = JavaScript XML

HTML jaisa syntax JavaScript ke andar.

Example:

```jsx
<h1>Hello World</h1>
```

---

# React JSX Directly Nahi Samajhta

React directly JSX read nahi karta.

Pehle JSX convert hota hai:

```jsx
<h1>Hello</h1>
```

↓

```js
React.createElement(
  "h1",
  {},
  "Hello"
)
```

↓

Object Structure

↓

DOM

---

# JSX Conversion Kaun Karta Hai?

Bundlers / Compilers:

- Babel
    
- Vite
    

Ka kaam hota hai JSX ko normal JavaScript me convert karna.

---

# React.createElement()

JSX ke peeche actual me yahi function chalta hai.

Example:

```js
React.createElement(
  "h1",
  {},
  "Hello"
)
```

Equivalent JSX:

```jsx
<h1>Hello</h1>
```

---

# React Components

React Component ek JavaScript Function hota hai jo JSX return karta hai.

Example:

```jsx
function MyApp(){
  return (
    <h1>Custom React</h1>
  );
}
```

---

# Variable Injection in JSX

JavaScript variables ko JSX me inject karne ke liye:

```jsx
{}
```

use karte hain.

Example:

```jsx
const username = "Aditya";

<h1>Hello {username}</h1>
```

Output:

```html
<h1>Hello Aditya</h1>
```

---

# React Setup

React Project create karne ke tools:

- Create React App
    
- Vite
    

Browser ke liye:

```js
react-dom
```

Mobile ke liye:

```js
react-native
```

---

# Key Takeaways 🚀

✅ React Element = Object

✅ React Element = type + props + children

✅ JSX browser nahi samajhta

✅ Babel/Vite JSX ko convert karte hain

✅ React.createElement JSX ke peeche ka function hai

✅ React Component = Function returning JSX

✅ Variables JSX me `{}` se inject hote hain

✅ Custom render function React ke internal working ko samajhne me help karta hai

✅ React internally ek tree structure create karta hai aur phir DOM update karta hai