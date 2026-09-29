### Server 
**Server is a software which serve service (serve response to request)**
![[Pasted image 20260929204804.png]]

![[Pasted image 20260929202432.png]]
![[Pasted image 20260929204948.png]]
![[Pasted image 20260929205231.png]]


<div align="center">

# ☕ Chai aur Backend

### 🚀 JavaScript Backend Roadmap

<img src="https://img.shields.io/badge/JavaScript-Backend-yellow?style=for-the-badge&logo=javascript"/>
<img src="https://img.shields.io/badge/Node.js-Runtime-green?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/Lecture-01-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge"/>

**From JavaScript → Node.js → Backend → Production**

</div>

---

# 📚 Lecture 01 — Introduction to Backend

> **Goal:** Understand what backend is, why we need it, and how a modern web application works behind the scenes.

---

## 🧠 What is Backend?

Backend is the **server-side part of an application** that handles:

- 🗄️ Data storage
- ⚙️ Business logic
- 🔐 Authentication
- 🛡️ Authorization
- 📡 API communication
- 🔒 Security
- 📂 File handling

In simple words:

> **Frontend shows and interacts with the application. Backend makes the application actually work.**

---

# 🌐 How a Web Application Works

```text
              👤 USER
                 │
                 ▼
        🎨 FRONTEND
       React / HTML / CSS
                 │
                 │ HTTP Request
                 ▼
          ⚙️ BACKEND
        Node.js / Express
                 │
                 ▼
          🗄️ DATABASE
        MongoDB / SQL
                 │
                 │ Data
                 ▼
          ⚙️ BACKEND
                 │
                 │ HTTP Response
                 ▼
        🎨 FRONTEND
                 │
                 ▼
              👤 USER
```

---

# 🎨 Frontend vs ⚙️ Backend

| Frontend | Backend |
|---|---|
| User Interface | Server Logic |
| React | Node.js |
| HTML | Express.js |
| CSS | APIs |
| Components | Controllers |
| User Interaction | Business Logic |
| Displays Data | Processes Data |
| Client Side | Server Side |

---

# 🏗️ Client-Server Architecture

A typical application contains:

```text
┌─────────────────────┐
│       CLIENT        │
│                     │
│  React / Browser    │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────┐
│       SERVER        │
│                     │
│ Node.js + Express   │
└──────────┬──────────┘
           │
           │ Database Query
           ▼
┌─────────────────────┐
│      DATABASE       │
│                     │
│      MongoDB        │
└─────────────────────┘
```

---

# 📡 What is an API?

API = **Application Programming Interface**

An API allows different software components to communicate with each other.

Example:

```text
React Frontend
      │
      │ GET /users
      ▼
Backend API
      │
      ▼
MongoDB
      │
      ▼
User Data
      │
      ▼
React
```

---

# 🔥 Example — Login System

When a user enters:

```text
Email: aditya@gmail.com
Password: ********
```

The frontend sends a request:

```http
POST /login
```

Backend receives the request:

```text
Request
   ↓
Validate Data
   ↓
Find User
   ↓
Check Password
   ↓
Authenticate User
   ↓
Generate Token
   ↓
Send Response
```

Frontend receives the response and can allow the user to access the application.

---

# 🟢 Why Node.js?

JavaScript was originally designed to run inside browsers.

Modern JavaScript can also run outside the browser using:

## Node.js

Node.js uses Google's **V8 JavaScript Engine**.

```text
JavaScript
     │
     ▼
V8 Engine
     │
     ▼
Node.js
     │
     ├── Servers
     ├── APIs
     ├── File System
     ├── Database Connections
     └── Backend Applications
```

---

# 🌍 Browser JavaScript vs Node.js

| Browser | Node.js |
|---|---|
| DOM available | ❌ No DOM |
| `window` | ❌ |
| `document` | ❌ |
| Browser APIs | ✅ |
| File System | ✅ |
| Create HTTP Server | ✅ |
| Database Connection | ✅ |
| Backend APIs | ✅ |

---

# 🧩 Backend Responsibilities

## 1. Authentication 🔐

Determines:

> **Who are you?**

Examples:

- Login
- Signup
- OTP
- Password reset
- JWT

---

## 2. Authorization 🛡️

Determines:

> **What are you allowed to do?**

Example:

```text
User
 └── Can read profile

Admin
 ├── Can read profile
 ├── Can delete users
 └── Can manage products
```

---

## 3. Business Logic ⚙️

Business rules are handled by the backend.

Example:

```text
Product Price = ₹1000

Discount = 20%

Backend calculates:

Final Price = ₹800
```

The frontend should not be the ultimate authority for such rules.

---

## 4. Database Operations 🗄️

Backend communicates with databases to:

```text
CREATE
READ
UPDATE
DELETE
```

These are known as:

# CRUD Operations

---

# 🔄 Complete Request Flow

```text
👤 User
   │
   ▼
🎨 React
   │
   │ HTTP Request
   ▼
⚙️ Express Server
   │
   ▼
🧠 Business Logic
   │
   ▼
🗄️ MongoDB
   │
   ▼
📦 Data
   │
   ▼
⚙️ Backend
   │
   │ HTTP Response
   ▼
🎨 React
   │
   ▼
👤 User
```

---

# 🛠️ Backend Roadmap

Our journey will roughly follow:

```text
JavaScript
    │
    ▼
Node.js
    │
    ▼
NPM & Modules
    │
    ▼
Express.js
    │
    ▼
REST APIs
    │
    ▼
MongoDB
    │
    ▼
Mongoose
    │
    ▼
Authentication
    │
    ▼
Authorization
    │
    ▼
File Upload
    │
    ▼
Error Handling
    │
    ▼
Production Backend
    │
    ▼
Deployment 🚀
```

---

# 🧠 Key Concepts

### Backend

Server-side part of an application responsible for processing requests, business logic, data and security.

### Server

A system that receives requests and sends responses.

### Client

The application that sends requests to the server.

### API

A defined interface through which software components communicate.

### Database

System used to store and manage application data.

### Node.js

JavaScript runtime that allows JavaScript to execute outside the browser.

### HTTP

Protocol commonly used for communication between client and server.

---

# 🎯 Lecture 1 Takeaways

- ✅ Backend runs on the server side.
- ✅ Frontend communicates with backend through APIs.
- ✅ Backend handles business logic.
- ✅ Backend communicates with databases.
- ✅ Node.js allows JavaScript to run outside the browser.
- ✅ Authentication and authorization are backend responsibilities.
- ✅ CRUD represents Create, Read, Update and Delete.

---

# 💭 Important Mental Model

Don't think:

```text
React → Database
```

Think:

```text
React
  ↓
API
  ↓
Backend
  ↓
Database
```

The backend acts as the controlled layer between the client and the data.

---

# 📝 Mentor Checkpoint

Before moving to Lecture 2, I should be able to answer:

- [ ] What is backend?
- [ ] Why do we need a backend?
- [ ] What is a server?
- [ ] What is a client?
- [ ] What is an API?
- [ ] What is Node.js?
- [ ] Why can't React directly replace a backend?
- [ ] What are CRUD operations?
- [ ] What is the difference between authentication and authorization?

---

<div align="center">

# ☕ Keep Coding

### One lecture at a time. One concept at a time.

**Chai aur Backend 🚀**

</div>