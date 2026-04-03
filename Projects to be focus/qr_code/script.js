const input=document.getElementById("text");
const btn=document.getElementById("click");
const qr=document.getElementById('qr-output');
const qrSection=document.querySelector(".qr-img");


function generateQr(text){
    const api="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    qr.src=api+text;
    qr.style.display = "block";
    qrSection.style.display="block";
    qrSection.style.display = "flex";


}
btn.addEventListener('click',()=>{
    let txt=input.value.trim();
    generateQr(txt);
})