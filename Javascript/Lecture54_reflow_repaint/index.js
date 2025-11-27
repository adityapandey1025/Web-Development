// code 1

const t1=performance.now();
for(let i=0;i<100;i++){
    let para=document.createElement('p');
    para.innerText="This is para no "+(i+1);
    document.body.appendChild(para);
}
const t2=performance.now();
 
console.log("The code 1 time is "+(t2-t1));

//code 2

const t3=performance.now();
// let mydiv=document.createElement();
let mydiv=document.createDocumentFragment();
for(let i=0;i<100;i++){
    let para=document.createElement('p');
    para.innerText="This is para no "+(i+1);
    mydiv.appendChild(para);
}
document.body.appendChild(mydiv);
const t4=performance.now();

console.log("The code 2 time is "+(t4-t3));

// Here code 1 takes more time than code 2.

// Pehle code me har appendChild ke baad browser layout fir se calculate karta hai (reflow) aur fir redraw karta hai (repaint) — 100 baar!
// Dusre code me sab p elements ek invisible container (fragment) me add hote hain, aur end me ek hi baar real DOM me jaate hain → sirf 1 reflow + 1 repaint, isliye bahut fast.


//Agar tum DOM me aisi change karte ho jo element ki size ya position badalti hai → Reflow hota hai.
// Agar sirf appearance (color, background) badalti hai → sirf Repaint hota hai.
// Reflow zyada heavy process hai browser ke liye.