
// code to create async function
//👇👇
// async function getData() {
//     setTimeout(function (){
//         console.log("I am Inside this functions");
//     },4000);
// }

// let output=getData();


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

// async function getData() {
//     let response=await fetch("https://api.freeapi.app/api/v1/kitchen-sink/http-methods");
//     let data=await response.json();
//     console.log(data);
// }
// getData();