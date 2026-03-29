Promise used because there is some difficulty in callback hell
- Deep nesting 😵
    
- Hard to read
    
- Hard to debug
    
- Error handling is painful
    

This is called **callback hell / pyramid of doom**.

```js
// Using Callback Hell
console.log("Lodu")
function Star(cb){
    let num=5;
    cb(5);
}
function ad(x,cb){
    
    cb(x+10);
}
function multipl(x,cb){
    cb(x*10);
}
function powee(x,cb){
    cb(x**2);
}
function divid(x,cb){
    cb(x/5);
}


Star(function(num){
    ad(num,function(num){
        multipl(num,function(num){
            powee(num,function(num){
                divid(num,function(num){
                    console.log(num);
                })
            })
        })
    })
})

// Now Using Promise
function Start(){
    return new Promise((resolve,reject)=>{
        resolve(5);
    })
}

function add(num){
    return new Promise((resolve,reject)=>{
        let x=num+10;
        resolve(x);
    })
}
function multiply(num){
    return new Promise((resolve,reject)=>{
        resolve(num*10);
    })
}
function powe(num){
    return new Promise((resolve,reject)=>{
        resolve(num**2);
    })
} 

function divide(num){
    return new Promise((resolve,reject)=>{
        resolve(num/5);
    })
}

Start()
    .then(add)
    .then(multiply)
    .then(powe)
    .then(divide)
    .then((res)=>{
        console.log(res)
    }) 
```


#### Another Example 
```js
console.log("hello World")
function getUserId(id,cb){
    setTimeout(()=>{
        cb({id,name:"Aditya"});
    },3000);
}

function getuserOrder(userId,cb){
    setTimeout(()=>{
        cb([{id:101,item:"Condom"}]);
    },4000);
}

function getUserStatus(item,cb){
    setTimeout(()=>{
        cb("Payment Success")
    },5000)
}   


getUserId(1,function(user){
    getuserOrder(user.id,function(order){
        getUserStatus(order[0].item,function(status){
            console.log(`User name is ${user.name} and order item is ${order[0].item} and status is ${status}`);
        })
    })
})

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
getId(1)
    .then(getOrder)
    .then(getStatus)
    .then(msg=>console.log(msg))

```



