
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()";



function generatePassword(){
    const length = document.getElementById('length').value;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasLower = document.getElementById('lowercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSymbols = document.getElementById('symbols').checked;

    let characters="";  
    if(hasUpper) characters+=upper;
    if(hasLower) characters+=lower;
    if(hasNumbers)  characters+=numbers;
    if(hasSymbols)  characters+=symbols;


    let password="";
    for(let i=0;i<length;i++){
        let c=Math.floor(Math.random()*characters.length);
        password +=characters[c];
    }
    document.getElementById("password-display").textContent=password;
}

document.getElementById("generate-btn").addEventListener('click',()=>{
    generatePassword();
})


document.getElementById("copy-btn").addEventListener('click',()=>{
    const pass = document.getElementById("password-display").textContent;
    navigator.clipboard.writeText(pass);
    document.getElementById("copy-btn").textContent = "Copied ✅";
    setTimeout(() => {
        document.getElementById("copy-btn").textContent = "Copy"; 
    }, 2000);

})
