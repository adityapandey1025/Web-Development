document.cookie="name=Aditya";
document.cookie="title=Pandey"
document.cookie="middle=kumar"
// To read cookie
// alert(document.cookie);
console.log(document.cookie)

let key=prompt("Enter Key")
let value=prompt("Enter value")
// document.cookie=`${key}=${value}`

// using encodeURIComponent
document.cookie=`${encodeURIComponent(key)}=${encodeURIComponent(value)}`

alert(document.cookie)
