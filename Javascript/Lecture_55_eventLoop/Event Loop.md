# ⭐ 1. What is Event Loop?

**Event Loop = JavaScript ka manager / traffic controller.**

Kyuki JavaScript **single-threaded** language hai  
→ ek time me **sirf ek hi kaam** kar sakti hai.

But web apps me:

- click events
    
- network requests
    
- timers (setTimeout)
    
- heavy tasks
    
- animations
    

sab ek saath ho rahe hote hain.

**Event loop ensure karta hai ki JS hang na ho** aur smooth chale.

---

# ⭐ 2. Why Event Loop is needed?

### ✔ JavaScript single-threaded hai

Agar JS ke paas koi heavy task aa jaye (e.g., API wait karna),  
aur woh ussi thread me chalta rahe → **page freeze ho jayega**.

Isko solve karne ke liye:

- Heavy/slow kaam background me bheja jaata hai (Web APIs)
    
- Event loop manage karta hai ki kab function wapas run hoga

# ⭐ 4. Benefits of the Event Loop

## ✔ 1. JavaScript non-blocking ho jati hai

JS wait nahi karti, balki kaam background me chalta rehta hai.

## ✔ 2. UI freeze nahi hota

User experience smooth rehta hai.

## ✔ 3. Async operations possible hote hain

- setTimeout
    
- setInterval
    
- fetch() API calls
    
- Promises
    
- Async/await
    

sab **event loop ki wajah se** chal rahe hain.

## ✔ 4. High performance for web apps

Tum API call kar sakte ho aur baaki code bhi run hota rhega.

## ✔ 5. Node.js ka backbone

Node.js single-threaded hote hue bhi 1 lakh concurrent connections handle kar leta hai  
→ sirf event loop ki wajah se.