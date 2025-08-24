// class Human{
//     //property
//     age =45;
//     wt=53;
//     ht=160;
//     name="adii";
//     gender='M';
//     #title='pandey';
    
//     //Behaviour
//     walk=function(){
//         console.log("I can Walk");
//     }

//     speak=function(){
//         console.log("I can Sing",this.#title);
//     }
     
//     think=()=>{
//         console.log("I can think");
//     }
//     get title(){
//         return this.#title;
//     }
//     set title(update_title){
//         this.#title=update_title;
//     }
// }
// let obj=new Human();
// console.log(obj.age);
// console.log(obj.ht);
// console.log(obj.wt);
// console.log(obj.name);
// obj.walk();
// obj.speak();
// obj.think();
// console.log(obj.age);
// console.log(obj.title);
// obj.title='singh';
// console.log(obj.title);


// class annimal{
//     breed;
//     name1;
//     constructor(species,species_name){
//         this.breed=species;
//         this.name1=species_name;
//     }
// }
// let obj=new annimal("jersey","cow");
// console.log(obj.breed);

//Default Paramters
// function sayName(fname='Shubham',lname='Singh'){
//     console.log('My name is ',fname,' ',lname);
// }
// sayName('Aditya','Pandey');
// sayName("Himanshu")
// sayName();
// sayName(23);
// sayName(undefined);

class hero{
    #fname='ben10';
    get fname(){
        return this.#fname;
    }
    set fname(xname){
        this.#fname=xname;
    }
}
let obj=new hero();
console.log(obj.fname);
obj.fname='Shaktimaan';
console.log(obj.fname);
