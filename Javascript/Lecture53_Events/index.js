
function event_action(){
    // let event_location=document.getElementById("fpara");
    event_location.innerText="Aaa Gye bhdwee";
}

let event_location=document.getElementById("fpara");
event_location.addEventListener('click',event_action);


// function change_colour(){
//     let spara=document.getElementById("spara");
//     spara.style.color="red";
// }

// let spara=document.getElementById("spara");
// spara.addEventListener('click',change_colour);

// // Removing event   
// // spara.removeEventListener('click',change_colour);

let anchor=document.getElementById("anchor");
anchor.addEventListener('click',(event)=>{
    event.preventDefault();
    anchor.innerText="Ye haath mujhe de de thakurr";
})


// Adding alert message with events
// let paras=document.querySelectorAll('div');
// for(let i=0;i<paras.length;i++){
//     let para=paras[i]
//     para.addEventListener('click',function(){
//         alert("You clicked on "+(i+1));
//     });
// }


// let paras=document.querySelectorAll('div');
// function alert_msg(event){
//     alert("Warning ! You clicke on -> "+event.target.textContent);
// }
// for(let i=0;i<paras.length;i++){
//     let para=paras[i];
//     para.addEventListener('click',alert_msg);
// }

let fdiv=document.getElementById('wrap');
function warn(event){
    if(event.target.nodeName==='SPAN'){
        alert("Message Warning "+event.target.textContent);
}
}
fdiv.addEventListener('click',warn);