let obj={
    fname:'Aditya',
    age:21,
    sex:'M',
    Wt:53
}
// console.log(obj);
// console.log(typeof(obj));
// obj.ht='170';
// console.log(obj);

// Shallow Copy
let obj2=obj;//This doesnt create copy. It only point to the location of obj

//Deep copy or Cloning

//Spread Method
// let dest={...obj};
// console.log(dest);
// obj.fname='shubham';
// console.log(obj);
// console.log(dest);

//Assign MEthod
// let dest=Object.assign({},obj);
// console.log(dest);
// obj.fname='shubham';
// console.log(obj);
// console.log(dest);

//Iteration method

let dest={};
for(let key in obj){
    dest[key]=obj[key];
}
console.log(dest);
obj.fname='shubham';
console.log(obj);
console.log(dest);
