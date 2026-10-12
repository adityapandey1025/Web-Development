**This is backend readme.md**

## U should know

Bhai, ye backend development ka bahut important concept hai. 🔥 Tumhara doubt hai: `npm run dev` karte hi server bhi chalta hai aur `localhost:3000` par website bhi open ho sakti hai. Jab humein server chahiye, toh website kahan se aa gayi?

Isko Node.js + Express ke example se samajhte hain.

## 1. Sabse pehle: Server aur Website alag cheezein hain

Server (Backend)

Ek program jo requests receive karta hai aur responses bhejta hai. Express server ka kaam hai routes handle karna, business logic chalana aur database se baat karna.

Website (Frontend)

HTML, CSS aur JavaScript ka interface jo browser mein display hota hai. Lekin har server website nahi bhejta; server JSON ya plain text bhi return kar sakta hai.

## 2. Jab tum `npm run dev` chalate ho, toh kya hota hai?

Maan lo tumhara `package.json` hai:

```
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
```

Aur `src/index.js` mein:

```
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

Ab terminal mein:

```
npm run dev
```

Iske baad ye process hota hai:

1. `npm run dev`

NPM tumhari dev script execute karta hai

2. Node.js + Express start

JavaScript code execute hota hai

3. `app.listen(3000)`

Port 3000 par requests accept karne lagta hai

4. Server ready hai

Ab browser, Postman ya frontend request bhej sakte hain

Dhyan do: Abhi tak website automatically create nahi hui. Sirf server start hua hai.

## 3. Phir `localhost:3000` par website jaisi cheez kahan se aati hai?

Jab tum browser mein ye URL open karte ho:

`http://localhost:3000/`

Tab browser server ko ek HTTP `GET /` request bhejta hai.

Tumhare code mein:

```
app.get("/", (req, res) => {
    res.send("Hello World");
});
```

Express is request ko match karta hai aur `"Hello World"` response mein bhejta hai.

Browser us response ko receive karke screen par display karta hai.

Browser

GET / request

Express Server — Port 3000

Route execute hota hai

HTTP Response

`"Hello World"`

Yahan browser ne website create nahi ki. Browser ne server se response manga aur usko display kiya.

## 4. Lekin backend mein toh website chahiye hi nahi!

Bilkul sahi. Backend-only application mein tum website ke bajay JSON return kar sakte ho.

Example:

```
app.get("/api/users", (req, res) => {
    res.status(200).json({
        success: true,
        users: [
            { name: "Aditya" },
            { name: "Rahul" }
        ]
    });
});
```

Ab browser mein `http://localhost:3000/api/users` open karoge, toh JSON data dikhega, traditional website nahi.

```
{
  "success": true,
  "users": [
    { "name": "Aditya" },
    { "name": "Rahul" }
  ]
}
```

API server ka purpose data aur functionality provide karna hai. Usko HTML website serve karna compulsory nahi hai.

## 5. Toh frontend aur backend alag ports par kaise chalte hain?

Tum React + Vite aur Express use kar rahe ho, toh typical development setup ye hota hai:

Frontend — Vite

5173

HTML, CSS, React components aur UI

HTTP requests / JSON responses

Backend — Express

3000

Routes, authentication, business logic aur database operations

- `http://localhost:5173` → React frontend.
    
- `http://localhost:3000` → Express backend.
    

Vite development server React app ke frontend assets serve karta hai. Express API requests handle karta hai. Dono independent servers hain, chahe tum unhe alag terminals mein chalao ya scripts se saath start karo.

Ek important distinction: Express se HTML return kiya ja sakta hai, aur Vite se frontend serve hota hai. Sirf port `3000` par hone ka matlab ye nahi ki website zaroor ban rahi hai.

## Final concept yaad rakho

- `npm run dev` → tumhari `package.json` ki `dev` script chalata hai.
    
- `app.listen(3000)` → Express ko port 3000 par requests sunne ke liye start karta hai.
    
- `app.get()` / `app.post()` → request ke according response dene ke rules define karte hain.
    
- Browser → HTTP request bhejta hai aur response ko render ya display karta hai.
    
- Website serve karna backend ki ek possible responsibility hai, mandatory responsibility nahi.
    

Ek question: Agar tumhare Express code mein `app.get("/")` bhi nahi hai aur `app.use(express.static(...))` bhi nahi hai, toh browser mein `localhost:3000/` open karne par kya hoga? Iska answer tumhare routing concept ko aur clear kar dega.