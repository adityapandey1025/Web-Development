document.getElementById('reciptBtn').addEventListener('click', function () {
      const ts = Date.now().toString().slice(-6);
      const rand = Math.floor(Math.random() * 900 + 100);
      document.getElementById('receiptNum').value = 'RCP-' + ts + rand;
    });

const fname=document.querySelector("#fname");
const lname=document.querySelector("#lname");
const mail=document.querySelector("#mail");
const number=document.querySelector("#number");
const fatherName=document.querySelector("#fatherName");
const motherName=document.querySelector("#motherName");
const roll=document.querySelector("#roll");
const session=document.querySelector("#session");
const course=document.querySelector("#course");
const program=document.querySelector("#program");
const college=document.querySelector("#college");
const section=document.querySelector("#section");
const feeType=document.querySelector("#fee-type");
const bankType=document.querySelector("#bankType");
const receiptNum=document.getElementById("receiptNum");
const submit=document.getElementById("submitBtn");
const reset=document.getElementById("resetBtn");



function showError(inputId,msg){
    let input=document.getElementById(inputId);
    let existing = input.parentNode.querySelector('.error');
    if (existing) existing.remove();
    let  error=document.createElement('span');
    error.classList.add('error');
    input.parentNode.appendChild(error);

    error.textContent=msg;
    error.style.color='red'
}

function clearError(inputId){
    let input=document.getElementById(inputId);
    let error=input.parentNode.querySelector('.error');
    if (error) error.remove();
}

function showSuccess(inputId,msg){
    let input=document.getElementById(inputId);
    let existing = input.parentNode.querySelector('.success');
    if (existing) existing.remove();
    let  success=document.createElement('span');
    success.classList.add('success');
    input.parentNode.appendChild(success);

    success.textContent=msg;
    success.style.color='green'

    setTimeout(()=>{
        success.remove();
    },2000)
}





fname.addEventListener('blur',()=>{
    let ans=/^[a-zA-Z]+$/.test(fname.value.trim());
    if(!fname.value.trim()){
        showError('fname','First Name is required');
    }
    else if(!ans){
        showError('fname','Name contains only alphabet');
    }
    else{
        finalValidation=true;
        clearError('fname');
    }
})


lname.addEventListener('blur',()=>{
    let pattern=/^[a-zA-Z]+$/.test(lname.value.trim());
    if(!lname.value.trim()){
        showError('lname','Last Name is required');
    }
    else if(!pattern){
        showError('lname','Last Name contains only alphabet');
    }
    else{
        finalValidation=true;
        clearError('lname');
    }
})

mail.addEventListener('blur',()=>{
    let pattern=/^[^\s@]+\@[^\s@]+\.[^\s@\d]+$/.test(mail.value.trim());
    if(!mail.value.trim()){
        showError('mail','email is required');
    }
    else if(!pattern){
        showError('mail','enter valid email id');
    }
    else{
        finalValidation=true;
        clearError('mail');
    }

})

number.addEventListener('blur',()=>{
    let pattern=/^\d{10}$/.test(number.value.trim());
    if(!number.value.trim()){
        showError('number','Number is required');
    }
    else if(!pattern){
        showError('number','enter valid number ');
    }
    else{
        finalValidation=true;
        clearError('number');
    }

})


fatherName.addEventListener('blur',()=>{
    let ans=/^[a-zA-Z\s]+$/.test(fatherName.value.trim());
    if(!fatherName.value.trim()){
        showError('fatherName','Father Name is required');
    }
    else if(!ans){
        showError('fatherName','Name contains only alphabet');
    }
    else{
        finalValidation=true;
        clearError('fatherName');
    }
})

motherName.addEventListener('blur',()=>{
    let ans=/^[a-zA-Z\s]+$/.test(motherName.value.trim());

    if(!ans){
        showError('motherName','Name contains only alphabet');
    }
    else{
        finalValidation=true;
        clearError('motherName');
    }
})


roll.addEventListener('blur',()=>{
    let pattern=/^2428CSIT\d{4}$/.test(roll.value.trim());
    if(!roll.value.trim()){
        showError('roll','Roll no is required');
    }
    else if(!pattern){
        showError('roll','enter valid roll no');
    }
    else{
        finalValidation=true;
        clearError('roll');
    }
})



session.addEventListener('change',()=>{
    
    if (session.value==='') {
    showError('session', 'Please select a session');
  } else {
    clearError('session');
  }
})

course.addEventListener('change', () => {
  if (course.value === '') {
    showError('course', 'Please select a course');
  } else {
    clearError('course');
  }
});

program.addEventListener('change', () => {
  if (program.value === '') {
    showError('program', 'Please select a program');
  } else {
    clearError('program');
  }
});

college.addEventListener('change', () => {
  if (college.value === '') {
    showError('college', 'Please select a college');
  } else {
    clearError('college');
  }
});

section.addEventListener('change', () => {
  if (section.value === '') {
    showError('section', 'Please select a section');
  } else {
    clearError('section');
  }
});

feeType.addEventListener('change', () => {
  if (feeType.value === '') {
    showError('fee-type', 'Please select a fee type');
  } else {
    clearError('fee-type');
  }
});

bankType.addEventListener('change', () => {
  if (bankType.value === '') {
    showError('bankType', 'Please select a payment method');
  } else {
    clearError('bankType');
  }
});


receiptNum.addEventListener('click',()=>{
    if(receiptNum.value==''){
        showSuccess('receiptNum', 'Generate first!');
        return;
    }
    else{
        navigator.clipboard.writeText(receiptNum.value);
        showSuccess('receiptNum', 'Copied!');

    }
})





function resetUI(){
    fname.value="";
    lname.value="";
    mail.value="";
    number.value="";
    fatherName.value="";
    motherName.value="";
    roll.value="";
    session.value="";
    program.value="";
    section.value="";
    college.value="";
    feeType.value="";
    bankType.value="";
    document.getElementById('hostel').checked=true;
    receiptNum.value="";
    
    document.querySelectorAll(".error").forEach(e=>e.remove())
    document.querySelectorAll(".success").forEach(e=>e.remove())
    finalValidation=false;
}

reset.addEventListener('click',()=>{
    resetUI();
})



submit.addEventListener('click',(e)=>{
    e.preventDefault();

    let isValid=true;

    document.querySelectorAll(".error").forEach(e => e.remove());

     // 1. First Name
    if (!fname.value.trim() || !/^[a-zA-Z]+$/.test(fname.value.trim())) {
        showError('fname', 'Enter valid first name');
        isValid = false;
    }

    // 2. Last Name
    if (!lname.value.trim() || !/^[a-zA-Z]+$/.test(lname.value.trim())) {
        showError('lname', 'Enter valid last name');
        isValid = false;
    }

    // 3. Email
    if (!mail.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) {
        showError('mail', 'Enter valid email');
        isValid = false;
    }

    // 4. Phone
    if (!/^\d{10}$/.test(number.value.trim())) {
        showError('number', 'Enter valid 10 digit number');
        isValid = false;
    }

    // 5. Father
    if (!fatherName.value.trim()) {
        showError('fatherName', 'Required');
        isValid = false;
    }

    // 6. Roll
    if (!roll.value.trim()) {
        showError('roll', 'Required');
        isValid = false;
    }

    // 7. Dropdowns
    if (session.value === "") isValid = false;
    if (course.value === "") isValid = false;
    if (program.value === "") isValid = false;
    if (college.value === "") isValid = false;
    if (section.value === "") isValid = false;
    if (feeType.value === "") isValid = false;
    if (bankType.value === "") isValid = false;

    // 8. Receipt check (IMPORTANT)
    if (receiptNum.value === "") {
        showError('receiptNum', 'Generate receipt first');
        isValid = false;
    }

    if(isValid){
        const formData={
        receipt: receiptNum.value,
        fname: fname.value,
        lname: lname.value,
        email: mail.value,
        phone: number.value,
        father: fatherName.value,
        mother: motherName.value,
        roll: roll.value,
        session: session.value,
        course: course.value,
        program: program.value,
        college: college.value,
        section: section.value,
        feeType: feeType.value,
        bankType: bankType.value
        };

        localStorage.setItem("formData",JSON.stringify(formData));
        window.open("reciept.html",'_blank');
        resetUI();


    }
    else{
        alert("Please fix errors ❌");
    }

})