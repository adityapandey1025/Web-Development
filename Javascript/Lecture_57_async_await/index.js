
// code to create async function
//👇👇
async function getData() {
    await setTimeout(function (){ // here await not works bcoz it works for promise object and setTimeout is not promise ..below there is code in which await works
        console.log("I am Inside this functions");
    },4000);
    console.log("hii bsdk");
}

let output=getData();
console.log("output :"+output);


//small code for async await understanding and u will understood promise too
async function Say(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Inside func ");
            resolve();
        },5000);
    })
}

console.log("hii");
async function calll() {
    await Say();
    // await setTimeout(function (){
    //     console.log("I am Inside this functions");
    // },4000);
    console.log("hii bsdk");
}

let res=calll();
console.log("rezult :"+res);

// Fetch is built in function jo data server se laane me kaam aara haii and it return promise
let url="https://randomuser.me/api/"
async function data(){
    try{
        let response=await fetch(url);
        let data=await response.json();
        console.log("username "+data["results"][0]["login"]["username"]);
    }
    catch(err){
        console.error(err);
    }
}

data();


//fetch api
//👇👇👇
// async function getData() {
//     let response=await fetch("https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%2Cid%2Ccontent&page=1");
//     let data=await response.json();
//     console.log(response);
//     console.log(data);
// }
// getData();

// // post 

// const url="https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post";

// const option={
//   method: "POST",           // method type
//   headers: {
//     "Content-Type": "application/json"  // tells server we are sending JSON
//   },
//   body: JSON.stringify({    // body = data you are sending
//     key1: "value1",
//     key2: "value2"
//   })
// };
// async function postData() {
//     let response=await fetch(url,option);
//     let data=await response.json();
//     console.log(data);
// }
// postData();

// post 

async function  post_data(url,obj){
    let response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    });
    let data=await response.json();
    console.log(data);
}

const url1="https://jsonplaceholder.typicode.com/posts";
obj={
    "userId":69,
    "id":966,
    "title":"TMKC",
    "body":"Chut pasand hai"
};
post_data(url1,obj);

// async function getData() {
//     let response=await fetch("https://api.freeapi.app/api/v1/kitchen-sink/http-methods");
//     let data=await response.json();
//     console.log(data);
// }
// getData();


// put 

const url2="https://jsonplaceholder.typicode.com/posts/1"; // id = 1 to update
let obj2={
    "userId":619,
    "id":646,
    "title":"TMKb",
    "body":"boobs bhi pasand hai"
}

async function update(url,obj) {
    try{
        let response=await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(obj)
        });
        if(response.ok) console.log("Update ho gya hai");
        let data=await response.json();
        console.log("Response "+data);
    }
    catch(err){
        console.error(err);
    }
}
update(url2,obj2);

// same delete 