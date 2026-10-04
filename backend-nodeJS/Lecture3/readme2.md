# 🔐 CORS + Same-Origin Policy + Proxy — 4 Complete Scenarios

> **Core question:**  
> What happens when `evil.com` tries to access `bank.com`, depending on whether CORS is enabled and whether the evil website uses a proxy?

---

## 🏦 Common Setup

Assume the victim has already logged in to:

```
https://bank.com
```

The browser has a bank session cookie:

```
bank.com
└── session=ABC123
```

The actual session/account information is maintained by the bank server:

```
Bank Server
└── ABC123 → Victim's authenticated session
```

Now the victim visits:

```
https://evil.com
```

---

# 🧠 First Understand: Where Is the Session?

The browser may store a cookie such as:

```
session=ABC123
```

The cookie belongs to `bank.com`, not `evil.com`.

Conceptually:

```
Browser Cookie Jar

bank.com
└── session=ABC123

evil.com
└── evilSession=XYZ789
```

The browser decides which cookies can accompany a request based on cookie rules such as:

- Domain / host
- Path
- `Secure`
- `SameSite`
- Expiration
- Credential mode

So **evil.com cannot simply read `bank.com`'s cookie**.

---

# ⚠️ Important Distinction

### CORS

Controls whether **browser JavaScript can read a cross-origin response**.

### Authentication

Determines:

> "Who is this requester?"

### Authorization

Determines:

> "Is this requester allowed to access this data?"

### Proxy

Forwards a request from one server to another.

```
CORS ≠ Authentication ≠ Authorization ≠ Proxy
```

---

# 🟢 SCENARIO 1 — CORS ✅ + Evil Proxy ❌

## Setup

Bank has CORS policy:

```
Access-Control-Allow-Origin: https://myfrontend.com
```

Evil website does **not** use a proxy.

It directly tries:

```
fetch("https://bank.com/my-account", {
    credentials: "include"
})
```

### Flow

```
                    VICTIM BROWSER
                          │
                          │ evil.com JavaScript
                          │
                          │ GET https://bank.com
                          ▼
                       BANK.COM
                          │
                          │ Request may be processed
                          ▼
                       Response
                          │
                          ▼
                    VICTIM BROWSER
                          │
                          │ CORS check
                          │
                          │ evil.com ❌
                          ▼
                    Evil JavaScript
                          │
                          X
                    Cannot READ response
```

### What happened?

```
Request reaches bank?       Potentially ✅
Bank processes request?     Potentially ✅
Response reaches browser?  ✅
Evil JS reads response?    ❌
```

### Why?

Because:

```
Origin: https://evil.com
```

does not match:

```
Access-Control-Allow-Origin: https://myfrontend.com
```

So the browser does not expose the response to evil.com's JavaScript.

> **Important:** For a simple CORS request, CORS does not necessarily prevent the request from reaching the server. It primarily prevents the response from being exposed to the requesting JavaScript.

---

# 🟡 SCENARIO 2 — CORS ✅ + Evil Proxy ✅

Now evil.com creates its **own server/proxy**.

For example, its Vite configuration:

```
server: {
    proxy: {
        "/api": "https://bank.com"
    }
}
```

Evil frontend:

```
fetch("/api/my-account")
```

### Flow

```
                    VICTIM BROWSER
                          │
                          │ /api/my-account
                          ▼
                    EVIL VITE SERVER
                          │
                          │ server → server
                          ▼
                       BANK.COM
                          │
                          │ ❌ Victim's bank cookie
                          │    is NOT automatically
                          │    available to Evil Vite
                          ▼
                    401 Unauthorized
```

### Critical point

The victim's browser has:

```
bank.com
└── session=ABC123
```

But Evil Vite has:

```
evil-server
└── ❌ session=ABC123
```

The browser does **not automatically transfer** the bank's cookie to the evil server.

Therefore:

```
Evil Vite → Bank
```

is a new server-to-server request.

### Does CORS stop this?

**No.**

CORS is a browser mechanism.

The communication:

```
Evil Vite → Bank
```

is server-to-server.

But without valid authentication:

```
Bank
 ↓
401 Unauthorized
```

### Result

```
CORS on bank?                  ✅
Evil proxy?                    ✅
Victim's bank session available
to evil server automatically?  ❌
Private data?                  ❌ normally
```

> **Proxy can avoid the browser's CORS boundary, but it does not magically obtain the victim's authentication credentials.**

---

# 🔴 SCENARIO 3 — CORS ❌ + Evil Proxy ❌

Now imagine the bank has **no CORS protection**.

Evil website directly requests:

```
fetch("https://bank.com/my-account", {
    credentials: "include"
})
```

Assume the browser's cookie rules allow the bank session cookie to accompany this request.

### Flow

```
                    VICTIM BROWSER
                          │
                          │ evil.com JS
                          │
                          │ GET bank.com
                          │
                          │ Cookie: session=ABC123
                          ▼
                       BANK.COM
                          │
                          │ Session valid ✅
                          ▼
                 Private account data
                          │
                          ▼
                    VICTIM BROWSER
                          │
                          │ No CORS restriction
                          ▼
                    Evil JavaScript
                          │
                          ▼
                 🚨 CAN READ DATA
```

### This is the dangerous situation.

Because:

```
Bank authentication
        ↓
Browser has valid session
        ↓
Request may be authenticated
        ↓
Response comes back
        ↓
No cross-origin restriction
        ↓
Evil JS can potentially READ response
```

### Result

```
CORS?                       ❌
Proxy?                      ❌
Browser has bank session?   ✅
Request authenticated?      Potentially ✅
Evil JS reads response?    🚨 Potentially YES
```

> **This illustrates why browser Same-Origin Policy/CORS exists: to prevent untrusted browser JavaScript from freely reading cross-origin responses.**

---

# 🔴 SCENARIO 4 — CORS ❌ + Evil Proxy ✅

Now:

```
Bank
└── No CORS policy
```

and evil.com uses its own proxy:

```
server: {
    proxy: {
        "/api": "https://bank.com"
    }
}
```

Evil frontend:

```
fetch("/api/my-account")
```

### Flow

```
                    VICTIM BROWSER
                          │
                          │ /api/my-account
                          ▼
                    EVIL VITE SERVER
                          │
                          │ server → server
                          ▼
                       BANK.COM
                          │
                          │ ❌ No victim session
                          │
                          ▼
                    401 Unauthorized
```

Even though:

```
CORS = OFF
```

the evil proxy still does **not automatically possess**:

```
session=ABC123
```

Therefore:

```
Evil Proxy → Bank
        ↓
No valid authentication
        ↓
401 Unauthorized
```

### Result

```
CORS?                       ❌
Evil proxy?                 ✅
Victim session available
to evil server automatically? ❌
Private data?               ❌ normally
```

---

# 📊 FINAL COMPARISON

|Scenario|Bank CORS|Evil Proxy|Victim's Bank Cookie Automatically Available to Evil Server?|Private Data Readable by Evil JS?|
|---|---|---|---|---|
|🟢 **1**|✅|❌|N/A — browser has it|❌ CORS blocks reading|
|🟡 **2**|✅|✅|❌|❌ normally|
|🔴 **3**|❌|❌|N/A — browser has it|🚨 **Potentially YES**|
|🔴 **4**|❌|✅|❌|❌ normally|