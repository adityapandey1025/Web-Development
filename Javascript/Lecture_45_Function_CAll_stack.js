//Variable hoisting and function hoisting
// callName("Aditya");
// function callName(name){
//     console.log(name);
// }
// Function hoisting outside block
// callName("Aditya");
// {
// function callName(name){
//       console.log(name);
// }
// }
// console.log(age);
// var age=22;

//
// console.log(x);
// let x=23;
// say("adii");
// let say=function(name){
//     console.log(name);
// }


// No class hoisting also
// class human{

// }
// const object1=new human();


// Function a first class citizen
 
// Asiign function to variable
// let prod=function(a,b){
//     return 3*3;
// }
// console.log(prod(3,2));

// Function passed as an argument
// function greet(){
//     console.log("Hiee!");
// }
// function Say(greet,name){
//     greet();
//     console.log(name);
// }
// Say(greet,"adii");

// return function

// function math(a){
//     return function(a){
//         return a*a;
//     }
// }
// let ans=math(5);
// let res=ans(7);
// console.log(res);

// Function stored inside array
let arr=[
    function(a,b){
        return a+b;
    },
    function(a,b){
        return a*b;
    },
    function(a,b){
        return a*b;
    },
    function(a,b){
        return a/b;
    }
];
let ans=arr[2];
let res=ans(45,5);
console.log(res);