# HTTP Crash Course — Hinglish Notes

HTTP Methods, HTTP Headers, Request–Response Cycle, Status Codes aur backend mein inka use.

## 1. HTTP kya hai?

HTTP = HyperText Transfer Protocol

HTTP ek communication protocol hai jo client aur server ke beech data exchange karne ke rules define karta hai.

Example: Tum browser mein `youtube.com` open karte ho.

Client (Browser / React App)

Request bhejta hai

HTTP Request ↔ HTTP Response

Server (Node.js / Express)

Request process karke response deta hai

Example:

```
GET /users HTTP/1.1
Host: example.com
```

Server response:

```
HTTP/1.1 200 OK
Content-Type: application/json

[
  { "username": "aditya" },
  { "username": "rahul" }
]
```

Yahan:

- `GET` — HTTP method.
    
- `/users` — requested resource ka path.
    
- `200 OK` — request successful.
    
- `Content-Type` — response body ka format.
    
- JSON array — response body.
    

Important: HTTP define karta hai ki request aur response kaise communicate karenge. Ye khud database ya backend framework nahi hai.

## 2. HTTP Request ke parts

Ek HTTP request ko samajhne ke liye ye structure yaad rakho:

```
HTTP REQUEST
│
├── Method
│    └── GET, POST, PATCH, DELETE
│
├── URL / Path
│    └── /api/users/123
│
├── Headers
│    └── Authorization, Content-Type
│
└── Body (optional)
     └── JSON, form data, etc.
```

Example:

```
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer <token>

{
  "username": "aditya",
  "email": "aditya@example.com"
}
```

Is request mein:

|Part|Meaning|
|---|---|
|`POST`|Resource create karne ke liye request|
|`/api/users`|Endpoint|
|`Content-Type`|Request body JSON format mein hai|
|`Authorization`|Authentication credential|
|Body|User ka data|

HTTP request mein body har baar compulsory nahi hoti. For example, normal `GET` request generally body use nahi karti.

## 3. HTTP Methods

HTTP methods server ko batate hain ki client resource ke saath kis type ka operation karna chahta hai.

Suppose tum ek Todo application bana rahe ho.

### GET

Data read karna

```
GET /api/todos
```

Server todos return karega. Usually resource state change karne ke liye nahi hota.

### POST

Naya resource create karna ya operation trigger karna

```
POST /api/todos
```

Request body mein new Todo ka data bhejte hain.

### PUT

Resource ko replace karna

```
PUT /api/todos/123
```

Generally resource ki complete representation replace karne ke liye.

### PATCH

Resource ka partial update

```
PATCH /api/todos/123
```

Sirf title ya `completed` field update kar sakte ho.

### DELETE

Resource delete karna

```
DELETE /api/todos/123
```

Server Todo ko delete karne ki koshish karega.

### Other important HTTP methods

|Method|Use|
|---|---|
|`HEAD`|GET jaisi response headers check karna, normally response body ke bina|
|`OPTIONS`|Resource par supported communication methods/options discover karna; CORS preflight mein bhi use hota hai|
|`CONNECT`|Proxy ke through tunnel establish karna|
|`TRACE`|Request path diagnose karna; security reasons se commonly disabled hota hai|

### PUT vs PATCH — important interview question

Suppose current user document:

```
{
  "username": "aditya",
  "email": "aditya@example.com",
  "age": 20
}
```

Tumhe sirf age update karni hai.

PATCH:

```
PATCH /api/users/123
Content-Type: application/json

{
  "age": 21
}
```

Conceptually, sirf `age` update hogi.

PUT:

```
PUT /api/users/123
Content-Type: application/json

{
  "username": "aditya",
  "email": "aditya@example.com",
  "age": 21
}
```

PUT generally complete resource representation replace karta hai. Exact behavior API ki implementation par depend kar sakta hai.

### Safe aur idempotent methods

Ye do HTTP properties bhi important hain:

- Safe: Method ka intended purpose resource state ko change karna nahi hai. `GET` aur `HEAD` safe methods hain.
    
- Idempotent: Same request ko multiple times repeat karne se intended final effect same hota hai. `PUT` aur `DELETE` idempotent methods hain.
    

Example: Ek Todo ko `DELETE` karne ke baad same delete request dobara bhejne par resource phir se delete nahi hota. Response status alag ho sakta hai, lekin intended final state same hai.

`POST` generally idempotent nahi hota: same create request do baar bhejne se do resources create ho sakte hain.

## 4. HTTP Headers kya hote hain?

Headers request ya response ke saath bheji jaane wali additional metadata hoti hain.

Example:

```
POST /api/users HTTP/1.1
Content-Type: application/json
Authorization: Bearer abc123
Accept: application/json
```

Yahan:

- `Content-Type` — request body ka format.
    
- `Authorization` — credentials/token.
    
- `Accept` — client kis response format ko accept kar sakta hai.
    

Headers body se different hain:

```
REQUEST
├── Headers → request ke baare mein metadata
└── Body    → actual data
```

### Important request headers

|Header|Meaning|
|---|---|
|`Host`|HTTP/1.1 mein target host|
|`Content-Type`|Body ka media type, e.g. `application/json`|
|`Accept`|Client ke acceptable response formats|
|`Authorization`|Authentication credentials|
|`Cookie`|Browser ke request ke saath bheje gaye cookies|
|`User-Agent`|Client software ki information|
|`Origin`|Cross-origin request ka origin; CORS mein important|
|`Referer`|Request trigger karne wale previous page ki information, if sent|
|`Cache-Control`|Caching ke instructions|
|`If-None-Match`|ETag ke basis par conditional request|

### Important response headers

|Header|Meaning|
|---|---|
|`Content-Type`|Response body ka format|
|`Set-Cookie`|Browser ko cookie set karne ka instruction|
|`Cache-Control`|Response caching rules|
|`Location`|Redirect ya newly created resource ka URL, context ke according|
|`Access-Control-Allow-Origin`|CORS mein allowed origin|
|`ETag`|Resource representation ka validator|
|`WWW-Authenticate`|Kuch `401` responses mein authentication challenge|

Yaad rakho: `Content-Type` request aur response dono mein ho sakta hai. Request mein client body ka format batata hai; response mein server returned body ka format batata hai.

## 5. `Content-Type` vs `Accept`

Ye dono frequently confuse hote hain.

Suppose React app backend ko JSON bhej raha hai:

```
axios.post("/api/users", {
    username: "aditya"
});
```

Axios JSON request bhejte waqt usually suitable `Content-Type` set kar deta hai.

Request:

```
Content-Type: application/json
Accept: application/json
```

Difference:

- `Content-Type: application/json` → Main jo bhej raha hoon, uska format JSON hai.
    
- `Accept: application/json` → Mujhe response JSON format mein chahiye.
    

Backend Express mein JSON request body parse karne ke liye:

```
app.use(express.json());
```

Is middleware ke baad, appropriate JSON request par:

```
console.log(req.body.username);
```

`aditya` print kar sakta hai.

`express.json()` incoming JSON body parse karta hai; ye response ko automatically JSON nahi banata. Response ke liye `res.json()` use kar sakte ho.

## 6. HTTP Status Codes

Server response mein status code batata hai ki request ka result kya raha.

|Code|Meaning|Example|
|---|---|---|
|`200 OK`|Request successful|Users fetch hue|
|`201 Created`|Resource create hua|New user registered|
|`204 No Content`|Success, response body nahi|Delete successful|
|`301 Moved Permanently`|Permanent redirect|URL permanently change hua|
|`302 Found`|Temporary redirect|Temporary redirect|
|`304 Not Modified`|Cached representation reuse ho sakti hai|Conditional GET|
|`400 Bad Request`|Request invalid|Invalid input|
|`401 Unauthorized`|Valid authentication credentials absent/invalid|Token invalid|
|`403 Forbidden`|Server request samajh gaya, access refuse kiya|User ko admin action ki permission nahi|
|`404 Not Found`|Resource nahi mila|User ID not found|
|`409 Conflict`|Current state se conflict|Duplicate username|
|`422 Unprocessable Content`|Content syntactically valid, lekin process nahi ho sakta|Validation failure|
|`429 Too Many Requests`|Rate limit exceed|Too many login attempts|
|`500 Internal Server Error`|Unexpected server error|Unhandled exception|
|`503 Service Unavailable`|Service temporarily unavailable|Server maintenance|

### 401 vs 403

```
401 → Authentication missing/invalid
403 → Authentication ho sakti hai, lekin permission nahi
```

Example:

- Login nahi kiya ya invalid token hai → `401`.
    
- Logged-in normal user admin-only endpoint access karta hai → `403`.
    

## 7. Express.js mein HTTP methods

Express routes HTTP methods ke according define hote hain:

```
import express from "express";

const app = express();

app.use(express.json());

app.get("/api/todos", (req, res) => {
    res.status(200).json({
        message: "Todos fetched"
    });
});

app.post("/api/todos", (req, res) => {
    const todo = req.body;

    res.status(201).json({
        message: "Todo created",
        data: todo
    });
});

app.patch("/api/todos/:id", (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        message: "Todo updated",
        id
    });
});

app.delete("/api/todos/:id", (req, res) => {
    res.status(204).end();
});

app.listen(3000);
```

### `req` ke important properties

```
req.params
req.query
req.body
req.headers
req.cookies
req.method
req.url
```

Inka use:

|Property|Example|
|---|---|
|`req.params`|`/users/123` → `req.params.id`|
|`req.query`|`/users?page=2` → `req.query.page`|
|`req.body`|JSON request data|
|`req.headers`|Incoming request headers|
|`req.cookies`|Parsed cookies, if cookie-parsing middleware is configured|
|`req.method`|`GET`, `POST`, etc.|

Example:

```
GET /api/users/123?page=2
Authorization: Bearer abc123
```

```
req.params.id      // "123"
req.query.page     // "2"
req.headers.authorization // "Bearer abc123"
```

`req.params` path se, `req.query` URL query string se, aur `req.body` request body se data leta hai.

## 8. HTTP vs HTTPS

- HTTP: Data transfer protocol.
    
- HTTPS: HTTP over TLS; connection ko encrypt karta hai aur server ki identity verify karne mein help karta hai.
    

Example:

```
http://example.com
https://example.com
```

Login passwords, JWTs aur cookies ko network par transmit karte waqt HTTPS use karna chahiye. HTTPS application ki authorization logic ka replacement nahi hai.

## Quick revision

HTTP — client-server communication protocol.

GET — read; POST — create/submit; PUT — replace; PATCH — partial update; DELETE — delete.

Headers — request/response metadata.

Body — request/response ka actual payload.

Status codes — response ka outcome.