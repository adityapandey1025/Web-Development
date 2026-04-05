const questions = [
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    answer: "Jupiter"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Saturn"],
    answer: "Mars"
  },
  {
    question: "How many moons does Earth have?",
    options: ["1", "2", "3", "0"],
    answer: "1"
  },
  {
    question: "Which is the closest star to Earth?",
    options: ["Sirius", "Proxima Centauri", "Sun", "Betelgeuse"],
    answer: "Sun"
  },
  {
    question: "Which planet has the most rings?",
    options: ["Jupiter", "Uranus", "Neptune", "Saturn"],
    answer: "Saturn"
  },
  {
    question: "Who was the first human to walk on the Moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
    answer: "Neil Armstrong"
  },
  {
    question: "Which is the smallest planet in our solar system?",
    options: ["Mars", "Mercury", "Venus", "Pluto"],
    answer: "Mercury"
  },
  {
    question: "What is the name of the galaxy we live in?",
    options: ["Andromeda", "Milky Way", "Whirlpool", "Triangulum"],
    answer: "Milky Way"
  },
  {
    question: "Which planet rotates on its side?",
    options: ["Neptune", "Saturn", "Uranus", "Jupiter"],
    answer: "Uranus"
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Mars", "Jupiter", "Venus"],
    answer: "Venus"
  }
];

const ques=document.querySelector("#ques-text");
const opt=document.querySelector("#options");
const feed=document.querySelector("#feedback");
const next=document.getElementById("next");

let loopNo=0;
let answered=false;
function loadQuestion(){
    answered=false;
    ques.textContent=questions[loopNo].question;
    opt.innerHTML="";
    for (let op of questions[loopNo].options){
        let label=document.createElement('label');
        let radio=document.createElement('input');
        let choice=document.createElement('span');
        choice.textContent=op;
        radio.type="radio";
        radio.name="option";
        radio.value=op;

        label.appendChild(radio);
        label.appendChild(choice);

        opt.appendChild(label);

    }
}
loadQuestion();

let totalTrue=0;

function checkAns(){
    if(answered) return;
    const selected=document.querySelector("input[name='option']:checked");

    if(!selected){
        feed.textContent = "⚠️ Please select an answer!";
        return;
    }

    if(selected.value===questions[loopNo].answer){
        feed.textContent= "✅ Correct!";
        totalTrue++;
    }
    else{
        feed.textContent = `❌ Wrong! Answer: ${questions[loopNo].answer}`;
    }
    answered=true;
    next.disabled = true;
    return true;
}

next.addEventListener('click',()=>{
    
    let ok=checkAns();
    if(!ok) return ;
    if(loopNo<questions.length-1){
        setTimeout(()=>{
            loopNo++;
            feed.textContent="";
            loadQuestion();
            next.disabled = false;
        },1000);
    }
    else{
         setTimeout(()=>{
            ques.textContent = "🎉 Quiz Finished!";
         feed.textContent=`You Score ${totalTrue} / ${questions.length}`
        opt.innerHTML = "";
        next.style.display = "none";
         },1000);
    }
})