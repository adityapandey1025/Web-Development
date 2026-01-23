let key=prompt("Enter key that u wannna set")
let value=prompt("Enter value that u wannna set")

localStorage.setItem(key,value)
console.log(`The value of ${key} is ${localStorage.getItem(key)}`)

localStorage.removeItem("null")
