// Object creation , declaration and access

// let obj3={
//     "name":"aditya",
//     "age":21,
//     "college":"Kiet",
//     cgpa:8.8,
//     greet : function(){
//         console.log("Hello Bhadwo kaise hoo");
//     }
// }
// console.log(obj3);
// console.log(typeof(obj3));
// console.log(obj3.name);
// obj3.greet();
// console.log(obj3.cgpa);


// shallow copy 

// let obj2=obj3;
// console.log(obj2);
// obj2.greet();

//Array -> Collection of items/elements

let arr=[21,'aditya',53.3,true,null];
// console.log(arr);

// let brr=new Array(22,'pandey',3.3,false,null);
// console.log(brr);

// console.log(arr[3]);
arr.push("babbar","Aand forces");
// console.log(arr);
// arr.pop();
// console.log(arr);
// arr.shift();
// console.log(arr);
// arr.unshift("Brahmana");
// console.log(arr);
// console.log(arr.slice(2,7));

// arr.splice(0,1,"100","99");
// console.log(arr)

// Map Function

// console.log(arr);
// arr.map((value,index)=>{
//     console.log(value,"index:",index);
// });

// let newArr=[3,5,9,2];
// let ans=newArr.map
// (value)=>{
//     return value**2;
// });
// console.log(ans);


// Filter Function
// let res=arr.filter((value)=>{
//     if(typeof(value)==='string'){
//         return true;
//     }
//     else{
//         return false;
//     }
// });
// console.log(res);

// let newstr = [32,34,53,25,56,82,46,81,76,71];
// let final=newstr.filter((number)=>{
//     return (number%2===0);
// })
// console.log(final);

// Reduce Method

//Normal traika se
// let z=[43,32,45];
// let sum=0;
// z.map((number)=>{
//     sum=sum+number;
// });
// console.log(sum);

// Reduce function use krke
// let total=z.reduce((acc,curr)=>{
//     return acc+curr;
// },0);
// console.log(total);
// let product=z.reduce((acc,curr)=>{
//     return acc*curr;
// },1);
// console.log(product);

//Sort Function
// console.log(z.sort((a,b)=>b-a));
// let nums = [1, 10, 5, 3];
// console.log(nums.sort((a,b)=>b-a)); 
// //Index Function
// console.log(z.indexOf(32));
// Find Function

// let search1=nums.find((num)=>num>=5);
// console.log(search1);
// let caste=["pandey","singh","yadav","verma"];
// let find=caste.find((title)=> title.startsWith("p"));
// console.log(find);

//for each
let array1=[12,62,853,61];
// array1.forEach((num,index)=>{
//     console.log("number: ",num," index: ",index);
// });

//For in loop

// let obj={
//     "name":"aditya",
//     "age":21,
//     "college":"Kiet",
//     cgpa:8.8,
//     greet : function(){
//         console.log("Hello Bhadwo kaise hoo");
//     }
// }

// for(let item in obj){
//     console.log(item,'=',obj[item]);

//  }
// let array2=[12,62,853,61];
// for(let ele in array2){
//     console.log(ele);
// }
// for(ele of array2){
//     console.log(ele);
// }