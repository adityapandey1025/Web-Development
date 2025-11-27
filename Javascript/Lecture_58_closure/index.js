function outer(){
    let name="aditya";
    function inner(){
        console.log(name);
    }
    return inner;
}

let res=outer();
console.log(res());

// here we think name variable is deleted because outer functio is executed and when we run inner() then name is not defined;
//but here name is binding with inner function thats called closure
// closure means combination of function and its surrounding state
// Closure matlab: “Function apni surrounding ki cheezein yaad rakhta hai, chahe outer function end ho gaya ho”.w