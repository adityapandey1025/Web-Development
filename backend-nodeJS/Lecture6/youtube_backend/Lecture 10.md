```js
npm i mongoose-aggregate-paginate-v2 // for doing aggregate pipelines in mongodb

npm i bcrypt // for hashing the password 
// we must not save the password as it is to the database , we first hash them then upload it on mongodb 

npm i jsonwebtoken // jwt is a bearer token
```



# JWT vs Session Authentication

Both **Session ID** and **JWT** are used for **authentication**.

## Session-Based Auth

`Login ↓ Server creates session ↓ sessionId = abc123 ↓ Browser stores it in Cookie ↓ Next request → Cookie: sessionId=abc123 ↓ Server checks Session Store ↓ User authenticated`

- **Session ID** → identifier
- **Session data** → stored on server
- **Cookie** → commonly used to send session ID

## JWT-Based Auth

`Login ↓ Server verifies password ↓ JWT created ↓ Client stores JWT ↓ Next request → JWT ↓ Server verifies JWT ↓ User authenticated`

JWT contains claims like:

```
{
  "userId": "101",
  "role": "user"
}
```

- **JWT** → signed authentication token
- Server can verify token without looking up a session
- Can be sent through:
    
    `Authorization: Bearer <JWT>`
    
    or stored in an **HttpOnly cookie**

## Main Difference

|Session|JWT|
|---|---|
|Client sends Session ID|Client sends JWT|
|Session data stored server-side|Claims carried inside token|
|Requires session state/store|Can be stateless|
|Often used with cookies|Can use cookie or Authorization header|

### Remember

> **Cookie = how credential is transported/stored in browser**  
> **Session = server-side authentication state**  
> **JWT = signed authentication token**

**JWT did not replace sessions.** Both are still used; JWT is especially common in API-based and distributed applications.