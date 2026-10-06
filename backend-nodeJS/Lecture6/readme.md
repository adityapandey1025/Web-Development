### Creating videoTube backend

## **Creating folder structure professionally**
```js
mkdir videoTube // Creating project folder

npm init -y // initializing node folder with this command

// inside package.json file , add 
"type":"module"
// and inside its sript key , add
	"dev":"nodemon ./src/index.js"
	
// now creating folder structure
// create src folder inside root directory
```

![[Pasted image 20261006112929.png]]

```js
 //create the .env file where u store ur credential and secret code

//create the .gitignore file where u store the file name whom u dont want to track by git . Use gitignore generator to copy paste the code 
[.gitignore generator](https://mrkandreev.name/snippets/gitignore-generator/)




// Now make .prettierrc file where u defined the identation , comma and all things which makes ur code clean for reading
.prettierrc file
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}



// Now make .prettierignore file where u tell ki prettier extension doesn't apply on these files or folders
.prettierignore file
node_modules
.env
.env.*
public/temp
dist
build
coverage
*.log

```


## **Making mongoDB connection**
**We have 2 ways by which we can connect mongoDB to application**

#### Architecture 1(Inside index.js)
```js
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';

const app=express();

dotenv.config();

(async ()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error",(error)=>{
      console.log("error is on express");
    })
    app.listen(process.env.PORT,()=>{
      console.log("app is running on port",process.env.PORT);
    })
    console.log("Database connection successfully");
  }
  catch(error){
    console.log("Database connection Failed",error.message);
    process.exit(1);
  }
})() // use IIFI

```


#### Architecture 2(Inside db folder create db.js )
```js
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'

const connectDB=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("DB Connection Succesfully to host ",connectionInstance.connection.host);
    } catch (error) {
        console.error("DB Connection failed ",error);
        console.error("DB Connection failed message",error.message);
        process.exit(1)
    }
}

export default connectDB;
```


### **Custom api response and error handling**

```js
npm i cors // installing cors package

import cors from 'cors'
```

**Allowed Every request 👇**
```js
app.use(cors()) // Allowed Every request
```

**Allowed some url 👇**
```js
const allowedOrigins=[
    "http://localhost:5173", // better if use process.env.CORS_ORIGIN_LOCALHOST
    "https://your-app.vercel.app"
]

// better if u use the below syntax
const allowedOrigins=process.env.CORS_ORIGIN.split(','); // in .env CORS_ORIGIN=http://localhost:5173,https://your-app.vercel.app

// now

app.use(cors({
	origin:allowedOrigins,
	credentials:true
}))
```

**More Better Approach 👇**
```js
const allowedOrigins=process.env.CORS_ORIGIN.split(','); // in .env CORS_ORIGIN=http://localhost:5173,https://your-app.vercel.app

app.use(cors({
	origin:(origin,callback)=>{
		if(!origin || allowedOrigins.includes(origin)){
			callback(null,true);
		}
		else{
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials:true
}))
```


**Some configuration code for accepting data from frontend**
```js
app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use(express.static("public"));

app.use(cookieParser());
```

### middlewares
![[Pasted image 20261006174629.png]]


### `app.get()`

```
app.get("/users", (req, res) => {
    // logic
});
```

### `app.use()`

```
app.use((req, res, next) => {
    // middleware logic
    next();
});
```

### Error-handling middleware

```
app.use((err, req, res, next) => {
    // error handle
});
```

# `next` — next middleware ko control dena

Ye sabse important hai.

`next` ek **function** hota hai.

```
app.use((req, res, next) => {
    console.log("Middleware 1");

    next();
});
```

`next()` ka meaning:

> **"Mera middleware ka kaam ho gaya. Ab Express next matching middleware/handler par jao."**

# 5. Middleware chain

Suppose:

```
app.use((req, res, next) => {
    console.log("1");
    next();
});

app.use((req, res, next) => {
    console.log("2");
    next();
});

app.get("/", (req, res) => {
    console.log("3");
    res.send("Hello");
});
```

Request aayi:

```
GET /
```

Flow:

```
Request
   ↓
Middleware 1
   ↓ next()
Middleware 2
   ↓ next()
GET /
   ↓
res.send()
   ↓
Response
```

Output:

```
1
2
3
```

---

# 6. Agar `next()` nahi lagaya?

Suppose:

```
app.use((req, res, next) => {
    console.log("Middleware 1");
});
```

Request aayi.

Middleware execute hua:

```
Request
   ↓
Middleware 1
   ↓
   ❌ STOP
```

Na:

```
next()
```

hua,

na:

```
res.send()
```

hua.

So request **hang** ho sakti hai.

That's why normal middleware mein either:

```
next();
```

ya response:

```
res.send(...);
```

dena hota hai.

---

# 7. `app.use()` mein `req, res, next`

Most common middleware:

```
app.use((req, res, next) => {
    console.log("Request received");

    next();
});
```

Here:

```
req  → incoming request
res  → outgoing response
next → next middleware
```

---

# 8. `app.get()` mein `req, res`

Normally:

```
app.get("/users", (req, res) => {
    res.json({
        message: "Users"
    });
});
```

Here `next` ki zarurat nahi agar ye final route handler hai.

Why?

Because route response send kar raha hai:

```
res.json(...)
```

So chain ends.

But `app.get()` mein `next` bhi le sakte ho:

```
app.get("/users", (req, res, next) => {
    next();
});
```

Then Express next matching handler/middleware ko continue karega.

# asyncHandler (Utils file)
Yes. Ab **4 approaches** ko compare karte hain. Tumhara main question hai: **kaunsa better hai aur `asyncHandler` ki actual need kya hai?**

Assume:

```
const getUser = async (req, res) => {
    const users = await User.find();
    return users;
};
```

---

## 1. Direct `async/await` route

```
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

Flow:

```
GET /users
   ↓
async route handler
   ↓
await User.find()
   ↓
users
   ↓
res.json(users)
```

### Problem?

Suppose DB error aa gaya:

```
const users = await User.find();
```

Then Promise reject ho sakta hai.

Modern Express versions can propagate rejected async handlers, but historically this was a common reason for using wrappers; in either case, a centralized wrapper can make your project's error-handling pattern explicit and consistent.

---

# 2. Normal function + `.then().catch()`

Tumhara code:

```
app.get("/users", (req, res, next) => {
    getUser()
        .then(users => res.json(users))
        .catch(next);
});
```

Yahan:

```
getUser()
   ↓
Promise
   ↓
.then()
   ↓
users
   ↓
res.json(users)

If error:
   ↓
.catch(next)
   ↓
Express error middleware
```

Ye **completely valid** approach hai.

But problem:

Agar 20 routes hain:

```
app.get("/users", (req, res, next) => {
    getUser()
        .then(...)
        .catch(next);
});

app.get("/posts", (req, res, next) => {
    getPosts()
        .then(...)
        .catch(next);
});

app.get("/products", (req, res, next) => {
    getProducts()
        .then(...)
        .catch(next);
});
```

Same boilerplate repeat ho raha hai.

---

# 3. `async/await` + `try/catch`

Another standard approach:

```
app.get("/users", async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});
```

Flow:

```
request
 ↓
async function
 ↓
try
 ↓
await User.find()
 ↓
success → res.json()
 
error
 ↓
catch
 ↓
next(error)
 ↓
error middleware
```

This is **very clean and readable**.

But again, every route repeats:

```
try {
   ...
} catch(error) {
   next(error);
}
```

---

# 4. `asyncHandler` ⭐

Now we solve that repetition.

Create once:

```
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error);
    }
};
```

Controller:

```
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
```

Route:

```
app.get("/users", asyncHandler(getUsers));
```

Flow:

```
GET /users
     ↓
Express
     ↓
asyncHandler(getUsers)
     ↓
returns middleware function
     ↓
Express calls (req,res,next)
     ↓
await getUsers(req,res,next)
     ↓
User.find()
     ↓
     ├── SUCCESS → res.json()
     │
     └── ERROR → catch → next(error)
```

---

# So which is better?

### For learning / small project:

```
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

is perfectly fine.

It's the **simplest to understand**.

---

### For a real backend with many routes:

I would prefer:

```
app.get("/users", asyncHandler(getUsers));
```

with:

```
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
```

because it gives you:

### 1. Clean controllers

```
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
```

No repetitive `try/catch`.

### 2. Centralized error handling

Every async controller automatically does:

```
error
 ↓
asyncHandler
 ↓
next(error)
 ↓
central error middleware
```

### 3. Reusable

One wrapper:

```
asyncHandler()
```

can handle:

```
users
posts
products
comments
orders
auth
...
```

### 4. Separation of concerns

You can keep:

```
Route
  ↓
Controller
  ↓
Service
  ↓
Database
```

and `asyncHandler` handles the common async-error plumbing.

---

# But one important thing 🔥

Don't think:

> "`asyncHandler` is faster/better than async/await."

No.

`asyncHandler` **itself doesn't make database queries faster**.

Its benefit is **code organization + centralized async error handling**.

---

## My preference for your backend learning

Since you're learning Express/Mongoose, I'd understand them in this order:

### Level 1 — Understand basic async/await

```
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

Understand this **first**.

### Level 2 — Understand Promise chaining

```
app.get("/users", (req, res, next) => {
    getUser()
        .then(users => res.json(users))
        .catch(next);
});
```

Understand that:

```
getUser()
   ↓
Promise
   ↓
.then()
   ↓
result
```

### Level 3 — Understand `try/catch`

```
app.get("/users", async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});
```

### Level 4 — Understand `asyncHandler` ⭐

```
app.get("/users", asyncHandler(getUsers));
```

Now you'll understand **why** `asyncHandler` exists rather than just memorizing the syntax.


```js
const asyncHandler=(fn)=>{
	return async (req,res,next)=>{

    try {

        await fn(req,res,next);

    } catch (error) {

        res.status(error.code || 500).json({

            success:false,

            message:error.message

        })

    }
    }

}
```

