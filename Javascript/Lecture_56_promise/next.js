let promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(true){
        resolve("Choood Diya bhaii");
    }
    else{
        reject("Chuud Gyee bhaii");
    }
    },5000)
})

console.log(promise);
promise
    .then(msg=>console.log("Message =",msg))
.catch((err)=>{
        console.error("Messsage Haii",err)
    })
.finally(()=>console.log("Khel Khatam Betaa!!!"))

setTimeout(()=>{
    console.log(promise)
},7000)