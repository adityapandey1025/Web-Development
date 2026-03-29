# 🔥 **What is async/await? (Super Simple)**

**async/await = Promises ko easy tareeke se likhne ka shortcut.**

Promise code me `.then()` `.catch()` ka chain lamba ho jata hai.  
Async/await usi ko **normal synchronous jaisa** bana deta hai.

![[Pasted image 20251127120616.png]]

![[Pasted image 20251127120718.png]]

![[Pasted image 20251127121013.png]]

# 🔥 **Real Meaning (Hinglish)**

- **async**: "Mera function asynchronous hoga, main Promise return karta hoon."
    
- **await**: "Jab tak result nahi aa jata, yahan ruk ja."

# 🍕 **Real-Life Example (Zomato Analogy)**

Imagine tumne food order kiya:

- `await` = “Main tab tak nahi jaaunga jab tak food aa nahi jata.”
    
- `async` = “Mera pura process asynchronous hoga.”

```js
console.log("Lundd Lee Lee Mera!!!")
function getId(id){
    return new Promise((resolve,reject)=>{
        resolve({id,name:"Aditya"});
    })
}
function getOrder(userId){
    return new Promise((resolve,reject)=>{
        resolve([{id:101,item:"Laptop"}]);
    })
}
function getStatus(id){
    return new Promise((resolve,reject)=>{
        resolve("Suceess");
    })
}
   

async function getId(){
    await getOrder();
    let z=await getStatus();
    console.log(z)
    
}
getId();
```
