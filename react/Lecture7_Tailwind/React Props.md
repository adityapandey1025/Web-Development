
# What are Props?

Props (Properties) React me Parent Component se Child Component ko data pass karne ke liye use hote hain.

Simple Definition:

> **Props are read-only objects used to pass data from Parent to Child Components.**

---

# Why Props?

Without Props:

```jsx
function Card(){
  return <h1>Hello Nikhil</h1>;
}
```

```jsx
<Card/>
<Card/>
<Card/>
```

Output:

```
Hello Nikhil
Hello Nikhil
Hello Nikhil
```

Same data.

Need dynamic data.

Solution:

Props.

---

# Function Analogy

JavaScript:

```js
function greet(name){
  console.log(name);
}

greet("Nikhil");
greet("Rahul");
```

React:

```jsx
<Card name="Nikhil"/>
<Card name="Rahul"/>
```

Props = Function Arguments.

---

# Basic Syntax

## Parent

```jsx
<Card name="Nikhil"/>
```

## Child

```jsx
function Card(props){
  return <h1>{props.name}</h1>;
}
```

Output:

```
Hello Nikhil
```

---

# Internal Working

React internally:

```jsx
<Card name="Nikhil"/>
```

becomes:

```js
Card({
  name:"Nikhil"
});
```

props:

```js
{
  name:"Nikhil"
}
```

---

# Props is an Object

Example:

```jsx
<Card
name="Nikhil"
age={20}
city="Lucknow"
/>
```

React creates:

```js
props={
name:"Nikhil",
age:20,
city:"Lucknow"
}
```

Access:

```jsx
props.name

props.age

props.city
```

---

# Multiple Props

```jsx
function Card(props){

return(
<>
<h1>{props.name}</h1>
<h2>{props.age}</h2>
<h3>{props.city}</h3>
</>
)

}
```

---

# Destructuring

Instead of:

```jsx
props.name

props.age
```

Use:

```jsx
function Card({name,age,city}){

return(
<>
{name}
{age}
{city}
</>
)

}
```

Best Practice.

---

# Passing Different Data Types

## String

```jsx
name="Nikhil"
```

## Number

```jsx
age={20}
```

## Boolean

```jsx
isLogin={true}
```

## Array

```jsx
marks={[10,20,30]}
```

## Object

```jsx
user={{
name:"Nikhil"
}}
```

## Function

```jsx
click={handleClick}
```

---

# Props are Read Only

Wrong:

```jsx
props.name="Rahul";
```

❌ Not Allowed.

Props are immutable.

Only Parent can change them.

---

# One Way Data Flow

React follows:

```
Parent

↓

Child

↓

GrandChild
```

Data always flows downward.

---

# Props vs State

|Props|State|
|---|---|
|Parent sends|Component owns|
|Read Only|Changeable|
|Immutable|Mutable|
|Transfer Data|Store Data|

---

# props.children

Example:

```jsx
<Card>

<h1>Hello</h1>

<button>Click</button>

</Card>
```

React internally:

```js
props={

children:...

}
```

Access:

```jsx
function Card(props){

return(

<div>

{props.children}

</div>

)

}
```

Very Common.

---

# Default Props

```jsx
function Card({name="Guest"}){

return <h1>{name}</h1>;

}
```

```jsx
<Card/>
```

Output:

```
Guest
```

---

# Internal Flow

```
Parent

↓

<Card name="Nikhil"/>

↓

React

↓

Create Props Object

↓

{

name:"Nikhil"

}

↓

Child(props)

↓

props.name

↓

UI
```

---

# Real Life Analogy

```
Father

↓

Pocket Money

↓

Son
```

Father = Parent

Pocket Money = Props

Son = Child

Child receives data but cannot modify Parent's data.

---

# Interview Questions

## What are Props?

Props are read-only objects used to pass data from Parent Components to Child Components.

---

## Can Child modify Props?

❌ No.

Only Parent can change Props.

---

## Are Props Mutable?

❌ No.

Props are immutable.

---

## Props vs Function Arguments

JavaScript:

```
sum(10,20);
```

React:

```
<Card name="Nikhil"/>
```

Very Similar.

---

# Golden Rule 🚀

```
Need to Pass Data?

↓

Parent

↓

Props

↓

Child

----------------

Props

↓

Read Only

----------------

Props

↓

JavaScript Object

----------------

props.name

props.age

props.city

----------------

Better

↓

{name,age,city}
```

# Easy Memory Trick 🔥

```
Function

↓

Arguments

↓

Parameters

----------------

React

↓

Props

↓

Props Object

----------------

Parent

↓

Props

↓

Child

----------------

Props = Read Only

State = Changeable

----------------

Props = Transfer Data

State = Store Data
```

# One-Line Interview Answer

```
Props are JavaScript objects automatically created by React to pass data from Parent Components to Child Components.
```