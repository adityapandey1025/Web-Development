

console.log("Hello jee kaise ho saare!!!"); // -> synchronus code

function greet(){
    console.log("Kaa ree bhdwee MKC"); // -> Asynchronus code
}
setTimeout(greet , 4000);

console.log("Ho gya complete bhdwee"); // -> synchronus code

//  Asynchronus code handle to browser and after its timer complete it back to the callback queue and if call stack is empty then it goes to the call stack 



// event Loop -> Constantly checks:👇👇
// “Is the call stack empty? If yes, let’s take one task from the callback queue and push it into the stack.”