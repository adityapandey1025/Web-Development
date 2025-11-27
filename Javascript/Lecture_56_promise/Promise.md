# 🔥 **What is a Promise in JS? (Simple Hinglish)**

**Promise = ek aisa object jo aane wale time me result dega.**  
Abhi nahi… thoda baad me.

JavaScript ke asynchronous kaam (jaise API call, setTimeout, DB read) finish hone ka **future result** store karta hai Promise.

---

# 💡 Real-Life Example

Tumne **Zomato pe order** kiya.

- Order placed → **Pending**
    
- Food arrived → **Resolved**
    
- Delivery cancelled → **Rejected**
    

Isi tarah Promise ke 3 states hote hain.

---

# 🟦 **Promise States**

1️⃣ **Pending**  
Waiting… result abhi nahi aaya.

2️⃣ **Resolved / Fulfilled**  
Success! Result mil gaya.

3️⃣ **Rejected**  
Error aagaya / fail ho gaya.

# 🔧 **Promise ka use kyu hota hai?**

### ✔ Asynchronous code handle karne ke liye

(jaise API calls, file read, timers)

### ✔ Callback Hell se bachne ke liye

(Promise se code clean hota hai)

### ✔ Future result ko handle karne ke liye
