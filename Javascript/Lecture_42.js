
// For Loop
let i;
for (i=0;i<5;i++){
    console.log(i)
}


console.log(i)

// While loop
while(i>0){
    console.log(i--);
}

// DO-while Loop
do{
    console.log(i);
    i++;
}
while(i<=5);

// String

let name="hello";
console.log(name);
let str1='world';
console.log(str1);
let str2=`This is aditya
pandey
from 
ballia`;
console.log(str2);
let str3=new String("This is new String");
console.log(str3);

// String In-Built functions

let user='Aditya Kumar Pandey';
console.log(user.length)
console.log(user.toUpperCase());
console.log(user.toLowerCase());
console.log(user.substring(5));
console.log(user.substring(4,12));
console.log(user.split(" "));
let z=user.split(" ");
console.log(z.join(" "));