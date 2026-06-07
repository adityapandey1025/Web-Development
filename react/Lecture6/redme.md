# React Fiber Architecture 🚀 (Hinglish Notes)

# What is React Fiber?

React Fiber React 16 me introduced ek **new reconciliation engine** hai.

Simple Definition:

> **React Fiber ek aisi architecture hai jo rendering work ko chhote-chhote units me divide karti hai aur React ko pause, resume, prioritize aur cancel work karne deti hai.**

---

# Biggest Misconception

❌ Fiber ne Virtual DOM ko replace kiya.

Wrong.

Correct:

```text
State Change
      ↓
Virtual DOM
      ↓
Fiber Reconciliation
      ↓
Real DOM
```

Virtual DOM abhi bhi exist karta hai.

Fiber old reconciliation algorithm ko replace karta hai.

---

# Why Fiber?

## Old React Problem

Suppose:

```text
10000 Components
```

Old React:

```text
Start

↓

Compare

↓

Compare

↓

Compare

↓

Finish

↓

DOM Update
```

React beech me ruk nahi sakta tha.

Browser wait karta tha.

Result:

❌ UI Freeze

❌ Lag

❌ Slow Animation

---

# Browser Problem

Browser 60 FPS pe kaam karta hai.

Har frame:

```text
16.6 ms
```

Agar React:

```text
100 ms
```

busy raha,

Browser frames miss karega.

Result:

Laggy UI.

---

# Fiber Solution

Fiber work ko divide karta hai.

Old React:

```text
10000

One Shot
```

Fiber:

```text
100

↓

Pause

↓

100

↓

Pause

↓

100
```

Browser ko kaam karne ka chance milta hai.

---

# Scheduling

Scheduling means:

> Work kab perform karna hai.

Example:

User typing:

```text
High Priority
```

Background data:

```text
Low Priority
```

Fiber:

```text
Typing

↓

First

--------------

Background

↓

Later
```

---

# React Philosophy

React Pull Model use karta hai.

Data aaye:

```text
React Decide Karega

Kab

Aur

Kaise

Process Karna Hai.
```

---

# Main Goals of Fiber

## 1 Pause Work

```text
Work

↓

Pause

↓

Browser

↓

Continue
```

---

## 2 Resume Work

```text
100

↓

Pause

↓

Continue

↓

200
```

---

## 3 Abort Work

Old Update:

```text
A
```

New Update:

```text
AB
```

Fiber:

```text
Cancel Old

↓

Run New
```

---

## 4 Reuse Work

Agar kuch change nahi hua:

```text
Header

Same

↓

Reuse
```

Extra computation avoid.

---

# What is a Fiber?

Simple Definition:

> A Fiber is a Unit of Work.

Har React Component ka ek Fiber Node hota hai.

Example:

```jsx
<App>

<Header/>

<Home/>

<Footer/>

</App>
```

Fiber Tree:

```text
App

|

Header

|

Home

|

Footer
```

---

# Fiber Node Stores

Har Fiber Node me information hoti hai:

✅ Component Type

✅ Props

✅ State

✅ Parent

✅ Child

✅ Sibling

✅ Priority

✅ DOM Reference

---

# Important Fiber Fields

## type

Component type.

Example:

```jsx
<div>

<App>
```

---

## key

List diffing ke liye.

Unique hona chahiye.

---

## child

Current component ka child.

```text
Parent

↓

Child
```

---

## sibling

Ek hi parent ke multiple children.

```text
Child1

↓

Sibling

↓

Child2
```

---

## return

Parent Fiber.

```text
Child

↓

Return

↓

Parent
```

---

## props

Component ki properties.

---

## priority

Kitna important update hai.

High:

```text
Typing

Button Click
```

Low:

```text
Background Loading
```

---

# Alternate

Fiber do copies maintain karta hai.

```text
Current Fiber

↓

Alternate

↓

Work In Progress Fiber
```

Naya UI prepare hota hai.

Phir swap hota hai.

---

# Render Phase

Kaam:

✅ Build Fiber Tree

✅ Calculate Changes

Pause allowed.

```text
Render

↓

Pause

↓

Continue
```

---

# Commit Phase

Kaam:

Update Real DOM.

Pause allowed?

❌ No.

```text
Commit

↓

DOM Update
```

Ek baar start hua to complete hoga.

---

# Fiber Internal Flow

```text
setState()

↓

New Virtual DOM

↓

Fiber Tree

↓

Break Work

↓

Priority Check

↓

Pause

↓

Resume

↓

Render Phase

↓

Commit Phase

↓

Real DOM
```

---

# Fiber vs Old React

|Old React|Fiber|
|---|---|
|Synchronous|Incremental|
|No Pause|Pause|
|No Resume|Resume|
|No Abort|Abort|
|No Priority|Priority|
|UI Freeze|Smooth UI|

---

# Fiber Advantages

✅ Incremental Rendering

✅ Scheduling

✅ Priorities

✅ Pause Work

✅ Resume Work

✅ Abort Work

✅ Reuse Work

✅ Better Performance

---

# React 18 Features Enabled by Fiber

✅ Concurrent Rendering

✅ Automatic Batching

✅ Suspense

✅ Transitions

✅ Streaming Rendering

✅ Selective Hydration

---

# Virtual DOM vs Fiber

Virtual DOM:

```text
WHAT changed?
```

Fiber:

```text
WHEN and HOW to process changes?
```

Real DOM:

```text
Display Final UI
```

---

# Real Life Analogy

Old React:

```text
100 Page Book

↓

Read All

↓

No Break
```

Fiber:

```text
10 Pages

↓

Break

↓

10 Pages

↓

Break

↓

Continue
```

Better performance.

---

# Interview Questions

## What is React Fiber?

React Fiber is the new reconciliation engine introduced in React 16 that breaks rendering work into small units and allows React to pause, resume, prioritize, reuse, and cancel rendering tasks.

---

## Did Fiber Replace Virtual DOM?

❌ No.

Fiber replaced the old reconciliation algorithm.

Virtual DOM still exists.

---

## Why was Fiber introduced?

To solve:

- UI Freeze
    
- Large Updates
    
- No Scheduling
    
- No Priorities
    
- Poor User Experience
    

---

# Golden Flow 🚀

```text
State Change

↓

Virtual DOM

↓

Fiber Reconciler

↓

Small Units of Work

↓

Priority Check

↓

Pause / Resume / Abort

↓

Render Phase

↓

Commit Phase

↓

Real DOM
```

# Easy Memory Trick

```text
Virtual DOM

↓

WHAT Changed?

----------------

Fiber

↓

WHEN and HOW to Update?

----------------

Real DOM

↓

Show Final UI

----------------

Fiber = Smart Scheduler + Reconciler
```

# One-Line Interview Answer 🔥

```text
Virtual DOM tells React what changed.

React Fiber decides when and how that work should be processed efficiently.

Real DOM displays the final updated UI.
```