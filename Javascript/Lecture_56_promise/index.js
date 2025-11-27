let mypromise=new Promise((resolve,reject)=>{
   let success=true
   console.log("Task running 1 ...");
   if(success){
        resolve("Resolved");
   }
   else{
        reject("Rejected");
   }
   
})

// mypromise.then((message)=>{
//     console.log("Message -> "+message);
// })
mypromise.then(msg =>console.log("Message "+msg))
.catch((err)=>{
    // console.log("Error -> "+err);
    console.error(err);
})
.finally(()=>{
    console.log("Always run finally block");
})


let promise=new Promise((resolve,reject)=>{
    console.log("Task Started ...");
    setTimeout(()=>{
        resolve("Resolve ho gya");
    },5000);
    console.log("Task tmkc.");
})
promise
.then((msg)=>{
    console.log("message  "+msg);
})


// Promise all
let p1=new Promise((resolve,reject)=>{
    setTimeout(resolve,1000,"first");
})
let p2=new Promise((resolve,reject)=>{
    setTimeout(resolve,2000,"second");
})
let p3=new Promise((resolve,reject)=>{
    setTimeout(reject,2000,"third");
})

Promise.all([p1,p2,p3]).then((value)=>{
    console.log(value);
}).catch(err=>{
    console.error(err);
})