# How React Renders a Component Internally 🚀

## Example

```jsx
function MyApp() {
  return (
    <h1>Custom React</h1>
  );
}

createRoot(document.getElementById("root"))
  .render(<MyApp />);
```

---

# Step 1: JSX Compilation

We write:

```jsx
<MyApp />
```

But React cannot directly understand JSX.

Babel converts it to:

```js
React.createElement(MyApp)
```

This creates a React Element object:

```js
{
  type: MyApp,
  props: {}
}
```

---

# Step 2: React Checks Element Type

React sees:

```js
{
  type: MyApp,
  props: {}
}
```

and checks:

```js
typeof MyApp
```

Output:

```js
"function"
```

React understands that:

> This is a Function Component.

---

# Step 3: React Executes the Component

React internally calls:

```js
MyApp()
```

The function returns:

```jsx
<h1>Custom React</h1>
```

---

# Step 4: JSX Again Converts to React Element

Returned JSX:

```jsx
<h1>Custom React</h1>
```

becomes:

```js
React.createElement(
  "h1",
  {},
  "Custom React"
)
```

which creates:

```js
{
  type: "h1",
  props: {
    children: "Custom React"
  }
}
```

---

# Step 5: React Creates Real DOM Element

React sees:

```js
type: "h1"
```

and creates:

```js
document.createElement("h1")
```

Then:

```js
domElement.textContent =
"Custom React";
```

Result:

```html
<h1>Custom React</h1>
```

---

# Step 6: React Finds Root Container

```js
document.getElementById("root")
```

returns:

```html
<div id="root"></div>
```

React now knows where to place the element.

---

# Step 7: React Appends Element to DOM

Internally React does something similar to:

```js
rootContainer.appendChild(domElement);
```

Final DOM:

```html
<div id="root">
  <h1>Custom React</h1>
</div>
```

---

# Internal Flow Diagram

```text
<MyApp />
      ↓
React.createElement(MyApp)
      ↓
{
  type: MyApp
}
      ↓
MyApp()
      ↓
<h1>Custom React</h1>
      ↓
React.createElement("h1")
      ↓
{
  type: "h1",
  props: {
    children: "Custom React"
  }
}
      ↓
document.createElement("h1")
      ↓
<h1>Custom React</h1>
      ↓
appendChild()
      ↓
Browser Screen
```

---

# Why createRoot()?

```js
createRoot(document.getElementById("root"))
```

creates a React Root.

React says:

> "I will manage everything inside this DOM element."

Without a valid DOM element:

```js
createRoot(null)
```

React throws:

```text
Target container is not a DOM element.
```

because React doesn't know where to render.

---

# Key Takeaways

✅ JSX is converted into React Elements

✅ React Elements are JavaScript Objects

✅ Function Components are executed by React

✅ Returned JSX becomes more React Elements

✅ React creates real DOM nodes from those objects

✅ createRoot() tells React where to mount the application

✅ render() starts the rendering process

✅ React finally updates the browser DOM