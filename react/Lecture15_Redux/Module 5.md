# Redux Module 5: Action & Payload 🍳

## Goal

Today we will learn:

- What is Action?
    
- What is Payload?
    
- Why do we need them?
    
- How do they relate to Context API?
    

---

# Recap

Context API:

```jsx
setTodos(prev=>{
    return [
        ...prev,
        newTodo
    ]
})
```

Question:

Where does newTodo come from?

```text
Component
```

Simple.

---

# Redux Problem

Need Add Todo.

Question:

How will Component send data to Redux?

Redux says:

```text
Send a message.
```

That message is called:

# ACTION

---

# Action

Definition:

Action is an object that tells Redux what happened.

Simple Hinglish:

```text
Redux bhai,

kuch hua hai.
```

Example:

```js
{
type:"addTodo"
}
```

Meaning:

```text
Add Todo happened.
```

---

# Problem

Need Add:

```js
{
id:1,
text:"React",
completed:false
}
```

Question:

Where is the actual data?

Need another property.

```js
{
type:"addTodo",

payload:{
id:1,
text:"React",
completed:false
}

}
```

---

# Payload

Definition:

Payload is the actual data carried by an Action.

Simple Hinglish:

```text
Action ke andar jo data travel karta hai.
```

---

# Real Life Analogy 😂

Courier Service.

Question:

Courier Box?

```text
Action
```

Question:

Gift inside the box?

```text
Payload
```

Need send something.

Need:

```text
Action

↓

Payload
```

---

# Redux Toolkit Magic

Need write:

```js
{
type:"addTodo",

payload:newTodo
}
```

Every time?

❌ No.

Redux Toolkit automatically creates it.

Need:

```js
addTodo(newTodo)
```

Toolkit internally makes:

```js
{
type:"todo/addTodo",

payload:newTodo
}
```

---

# Reducer

Need:

```js
addTodo(state,action){

}
```

Question:

State?

```text
Current Todos
```

Question:

Action?

```text
Message sent by Component
```

Need actual Todo.

Question:

Where?

```js
action.payload
```

---

# Dry Run

Current Todos:

```js
[
{
id:1,
text:"React"
}
]
```

Need Add:

```js
{
id:2,
text:"Redux",
completed:false
}
```

Component:

```js
dispatch(addTodo(newTodo))
```

Redux Toolkit:

```js
action={

type:"todo/addTodo",

payload:newTodo

}
```

Reducer:

```js
addTodo(state,action)
```

Need current todos:

```js
state
```

Need new todo:

```js
action.payload
```

Update:

```js
state.push(action.payload)
```

Done.

---

# Context API Mapping

Context:

```jsx
setTodos(prev=>{

newTodo

})
```

Redux:

```js
addTodo(state,action){

state.push(action.payload)

}
```

---

# Mapping Table

|Context API|Redux|
|---|---|
|prev|state|
|newTodo|action.payload|
|setTodos|reducer function|
|update state|state.push()|

---

